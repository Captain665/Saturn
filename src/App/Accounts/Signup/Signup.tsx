import { useEffect, useState } from "react";
import SignupData from "./Signup.html";
import { useNavigate } from "react-router";
import ValidateHtml from "./Validate.html";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { profileInfo } from "../../CommonTypes/CommonType";
import { SetLocalData } from "../../Components/CustomHooks";
import ErrorToster from "../../Components/MessageToggle";
import usePostRequest from "../../ApiCall/PostRequest";

export default function SignUp() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const { data, isLoading, error, fetch } = usePostRequest();


    const [userInfo, setUserInfo] = useState<profileInfo>({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        password: "",
        gender: ""
    });

    const [isValidate, setIsValidate] = useState<boolean>(false);
    const [otp, setOtp] = useState<number | undefined>()
    const [errorMsg, setError] = useState<any>();


    // Sign Up js

    function handleSignupOnChange(event: any): void {
        const name: string = event.target.name;
        const value: string = event.target.value
        setUserInfo((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    useEffect(() => {

        if (data === "Otp sent to the Register Email Id") {
            const message = {
                status: 200,
                error: null,
                result: data
            }
            setError(message)
            setIsValidate(true)
        }
        else if (data) {
            SetLocalData("userInfo", data)
            const path: string = params.get("redirectedTo") || "/"
            navigate(path, { replace: true })
        }
        if (error) {
            setError(error)
        }
    }, [data, error])

    function handleSignupSubmit(event: any): void {
        event.preventDefault()
        fetch("/signup", userInfo);
    }

    // otp validate js

    function handleOtpChange(event: any): void {
        setOtp(event.target.value)
    }

    function handleOtpSubmit(event: any): void {
        event.preventDefault()
        const payload = {
            mobileNumber: userInfo?.mobileNumber,
            otp: otp
        }
        fetch("/otp-validate", payload)
    }

    return (
        <>
            {isValidate
                ? <ValidateHtml
                    handleOtpChange={handleOtpChange}
                    handleOtpSubmit={handleOtpSubmit}
                    emailId={userInfo?.emailId}
                    otp={otp}
                    redirectedTo={params.get("redirectedTo")}
                    isLoading={isLoading}
                />
                : <SignupData
                    userInfo={userInfo}
                    handleSubmit={handleSignupSubmit}
                    handleOnChange={handleSignupOnChange}
                    redirectedTo={params.get("redirectedTo")}
                    isloading={isLoading}
                />
            }
            <Spinner
                isLoading={isLoading}
            />

            {errorMsg && <ErrorToster props={errorMsg} />}
        </>
    )
}