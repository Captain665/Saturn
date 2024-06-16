import React, { useState } from "react";
import SignupData from "./Signup.html";
import { useNavigate } from "react-router";
import ErrorToster from "../../Components/MessageToggle";
import { SignupResponse, OtpValidateReponse } from "../../ApiCall/SignupApi";
import ValidateHtml from "./Validate.html";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { errorState, profileInfo, userInfo } from "../../CommonTypes/CommonType";
import { SetLocalData } from "../../Components/CustomHooks";

export default function SignUp() {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const [userInfo, setUserInfo] = useState<profileInfo>({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        password: "",
        gender: ""
    });

    const [isloading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<errorState>()
    const [isValidate, setIsValidate] = useState<boolean>(false);
    const [otp, setOtp] = useState<number | undefined>()


    // Sign Up js

    function handleSignupOnChange(event: any): void {
        const name: string = event.target.name;
        const value: string = event.target.value
        setUserInfo((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }


    const fetchSignUp = async (): Promise<void> => {
        setIsLoading(() => true)
        const response: errorState = await SignupResponse(userInfo);

        if (response.status === "success") {
            setIsValidate(true)
            setError(response)
        } else {
            setError(response)
        }
        setIsLoading(false)
    }

    function handleSignupSubmit(event: any): void {
        event.preventDefault()
        fetchSignUp()
    }

    // otp validate js

    function handleOtpChange(event: any): void {
        setOtp(event.target.value)
    }

    const fetchOtp = async (): Promise<void> => {
        setIsLoading(() => true)
        const response = await OtpValidateReponse(userInfo?.mobileNumber, otp)
        if (response?.status === "success") {
            const data: userInfo = response?.result;
            SetLocalData("userInfo", data)
            const path: string = params.get("redirectedTo") || "/"
            navigate(path, { replace: true })
        } else {
            setError(() => response)
        }
        setIsLoading(false)
    }

    function handleOtpSubmit(event: any): void {
        event.preventDefault()
        fetchOtp()
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
                    isLoading={isloading}
                />
                : <SignupData
                    userInfo={userInfo}
                    handleSubmit={handleSignupSubmit}
                    handleOnChange={handleSignupOnChange}
                    redirectedTo={params.get("redirectedTo")}
                    isloading={isloading}
                />
            }
            <Spinner
                isLoading={isloading}
            />
            {error && <ErrorToster props={error} />}    
        </>
    )
}