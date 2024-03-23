import React, { useState } from "react";
import SignupData from "./Signup.html";
import { useNavigate } from "react-router";
import ErrorToster from "../../Components/MessageToggle";
import { SignupResponse, OtpValidateReponse } from "../../ApiCall/SignupApi";
import ValidateHtml from "./Validate.html";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";

export default function SignUp() {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const [userInfo, setUserInfo] = useState({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        password: "",
        gender: ""
    });

    const [isloading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isValidate, setIsValidate] = useState(false);
    const [otp, setOtp] = useState("")


    // Sign Up js

    function handleSignupOnChange(event) {
        const target = event.target;
        setUserInfo((prevData) => ({
            ...prevData,
            [target.name]: target.value
        }))
    }


    const fetchSignUp = async () => {
        setIsLoading(() => true)
        const response = await SignupResponse(userInfo);

        if (response.status === "success") {
            setIsValidate(() => true)
            setError(() => response)
        } else {
            setError(() => response)
        }
        setIsLoading(() => false)
    }

    function handleSignupSubmit(event) {
        event.preventDefault()
        setError(null)
        fetchSignUp()
    }

    // otp validate js

    function handleOtpChange(event) {
        setOtp(event.target.value)
    }

    const fetchOtp = async () => {
        setIsLoading(() => true)
        const response = await OtpValidateReponse(userInfo.mobileNumber, otp)
        if (response.status === "success") {
            const data = JSON.stringify(response.result)
            localStorage.setItem("userInfo", data)
            const path = params.get("redirectedTo") || "/"
            navigate(path, { replace: true })
            window.location.reload(path)
        } else {
            setError(() => response)
        }
        setIsLoading(false)
    }

    function handleOtpSubmit(event) {
        event.preventDefault()
        setError(null)
        fetchOtp()
    }

    return (
        <>
            {isValidate
                ? <ValidateHtml
                    handleOtpChange={handleOtpChange}
                    handleOtpSubmit={handleOtpSubmit}
                    emailId={userInfo.emailId}
                    otp={otp}
                    redirectedTo={params.get("redirectedTo")}
                />
                : <SignupData
                    userInfo={userInfo}
                    handleSubmit={handleSignupSubmit}
                    handleOnChange={handleSignupOnChange}
                    redirectedTo={params.get("redirectedTo")}
                />
            }
            <Spinner 
            isLoading={isloading}
            />
            {error && <ErrorToster props={error} />}
        </>
    )
}