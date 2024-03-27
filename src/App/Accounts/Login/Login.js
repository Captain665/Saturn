import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./Login.html";
import { LoginResponse } from "../../ApiCall/LoginApi";
import ErrorToster from "../../Components/MessageToggle";
import Spinner from "../../Components/Spinner";

export default function Login() {
    const [param] = useSearchParams()
    const navigate = useNavigate()


    const [loginData, setloginData] = useState({ mobileNumber: "", password: "" })
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const msg = param.get("message");

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        if (value?.length <= 10) {
            setloginData((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }
    }


    const fetchData = async () => {
        setLoading(true)
        const response = await LoginResponse(loginData)

        if (response.status === "success") {
            localStorage.setItem("userInfo", JSON.stringify(response.result));
            const path = param.get("redirectedTo") || "/";
            navigate(path, { replace: true })
        } else {

            setError(response)
        }
        setLoading(false)
    }

    const HandleSubmit = (event) => {
        event.preventDefault()
        fetchData()
    }

    console.log(param.get("message"))
    console.log(param.get("redirectedTo"))  



    return (
        <>
            <LoginForm
                isLoading={isLoading}
                handleChange={handleChange}
                HandleSubmit={HandleSubmit}
                loginData={loginData}
                redirectedTo={param.get("redirectedTo")}
                msg={msg}
            />

            <Spinner
                isLoading={isLoading}
            />

            {error && <ErrorToster props={error} />}
        </>
    )
}