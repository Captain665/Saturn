import React, { useState } from "react";
import ValidateHtml from "./Validate.html";
import ErrorToster from "../../../MessageToggle";
import { OtpValidateReponse } from "../../ApiCall/SignupApi";
import { useLocation, useNavigate } from "react-router";

export default function Validate(){
    const { state } = useLocation();
    const {mobileNumber, emailId} = state;

    const navigate = useNavigate()
    const [info, setInfo] = useState({
        mobileNumber : mobileNumber,
        otp : ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    function handleOtpChange(event) {
        setInfo(prevData => ({
            ...prevData,
            otp : event.target.value
        }))
    }

    const fetchOtp = async () => {
        setIsLoading(true)
            const response = await OtpValidateReponse(info)
            if (response.status === "success") {
                const data = JSON.stringify(response.result)
                localStorage.setItem("userInfo", data)
                navigate("/")
            }else{
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
        <ValidateHtml 
            handleOtpChange={handleOtpChange}
            handleOtpSubmit={handleOtpSubmit}
            isLoading={isLoading}
            emailId={emailId}
            otp={info.otp}
            />
            {error && <ErrorToster props={error} />}
        </>
    
    )
}