import React, { useState } from "react";
import SignupData from "./Signup.html";
import { useNavigate } from "react-router";
import ValidateHtml from "./Validate.html";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { errorState, profileInfo, userInfo } from "../../CommonTypes/CommonType";
import { SetLocalData } from "../../Components/CustomHooks";
import { PostRequest } from "../../ApiCall/ApiCall";

export default function SignUp() {
    const navigate = useNavigate()
    const [params, setSearchParams] = useSearchParams()


    const [userInfo, setUserInfo] = useState<profileInfo>({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        password: "",
        gender: ""
    });

    const [isloading, setIsLoading] = useState<boolean>(false)
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
        setIsLoading(true)
        const response = await PostRequest(userInfo, "/signup")

        if (response.status != 200) {
            setSearchParams(param => {
                param.set("error", response.data.error)
                param.set("status", JSON.stringify(response.status))
                return param;
            })
        } else {
            setSearchParams(param => {
                param.set("status", JSON.stringify(response.status))
                param.set("message", response.data.result)
                return param;
            })
            setIsValidate(true)
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
        setIsLoading(true)
        const payload = {
            mobileNumber: userInfo?.mobileNumber,
            otp: otp
        }
        const response = await PostRequest(payload, "/otp-validate")

        if (response.status != 201) {
            setSearchParams(param => {
                param.set("error", response.data.error)
                param.set("status", JSON.stringify(response.status))
                return param;
            })
        } else {
            const data: userInfo = response?.data.result;
            SetLocalData("userInfo", data)
            const path: string = params.get("redirectedTo") || "/"
            navigate(path, { replace: true })
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
        </>
    )
}