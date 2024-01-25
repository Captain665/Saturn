import React, { useState } from "react";
import SignupData from "./Signup.html";
import { useNavigate } from "react-router";
import ErrorToster from "../../../MessageToggle";
import { SignupResponse, OtpValidateReponse } from "../../ApiCall/SignupApi";
import ValidateHtml from "./Validate.html";

export default function SignUp() {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        password: "",
        gender: "Male"
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

    function handleGender(event) {
        setUserInfo((prevData) => ({
            ...prevData,
            gender: event.target.value
        }))
    }

    const fetchSignUp = async () => {
        setIsLoading(true)
        const response = await SignupResponse(userInfo);
        if (response.status === "success") {
            setIsValidate(true)
            setError(response)
        } else {
            setError(response)
        }
        setIsLoading(false)
    }

    function handleSignupSubmit(event) {
        event.preventDefault()
        fetchSignUp()
    }
    console.log(isValidate)


    // otp validate js

    function handleOtpChange(event) {
        setOtp(event.target.value)
    }

    const fetchOtp = async () => {
        setIsLoading(true)
        const response = await OtpValidateReponse(userInfo.mobileNumber, otp)
        if (response.status === "success") {
            const data = JSON.stringify(response.result)
            localStorage.setItem("userInfo", data)
            navigate("/", {replace:true})
            window.location.reload(true)
        } else {
            setError(response)
        }
        setIsLoading(false)
    }

    function handleOtpSubmit(event) {
        event.preventDefault()
        fetchOtp()
    }



    return (
        <>
            {isValidate ?
                <ValidateHtml
                    handleOtpChange={handleOtpChange}
                    handleOtpSubmit={handleOtpSubmit}
                    isLoading={isloading}
                    emailId={userInfo.emailId}
                    otp={otp}

                /> :
                <SignupData
                    userInfo={userInfo}
                    handleSubmit={handleSignupSubmit}
                    handleGender={handleGender}
                    handleOnChange={handleSignupOnChange}
                    isloading={isloading}
                />
            }
            {error && <ErrorToster props={error} />}
        </>
    )
}