import React, { useState } from "react";
import SignupData from "./Signup.html";
import { useNavigate } from "react-router";
import ErrorToster from "../../../MessageToggle";
import { SignupResponse } from "../../ApiCall/SignupApi";

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

    
    function handleOnChange(event) {
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

    const fetchData = async () => {
        setIsLoading(true)
        const response = await SignupResponse(userInfo);
        if(response === "success"){
            navigate("?form=verify", { state: { mobileNumber: userInfo.mobileNumber, emailId: userInfo.emailId } })
        }else{
            setError(response)
        }
        setIsLoading(false)
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetchData()
    }


    return (
        <>
            <SignupData
                userInfo={userInfo}
                handleSubmit={handleSubmit}
                handleGender={handleGender}
                handleOnChange={handleOnChange}
                isloading={isloading}
            />
            {error && <ErrorToster props={error} />}
        </>
    )
}