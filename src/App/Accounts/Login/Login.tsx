import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./Login.html";
import { LoginResponse } from "../../ApiCall/LoginApi";
import ErrorToster from "../../Components/MessageToggle";
import Spinner from "../../Components/Spinner";
import { errorState, userInfo } from "../../CommonTypes/CommonType"
import { SetLocalData } from "../../Components/CustomHooks";

export default function Login() {
    const [param] = useSearchParams()
    const navigate = useNavigate()


    const [loginData, setloginData] = useState<{
        mobileNumber: string;
        password: string
    }>({ mobileNumber: "", password: "" })
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<errorState>()

    const msg: string | null = param.get("message");

    useEffect(() => {
        const messages: errorState = {
            status: "failure",
            error: msg,
            result: null
        }
        setError(messages)
    }, [msg])

    function handleChange(event: any): void {
        const name: string = event.target.name;
        const value: string = event.target.value;
        if (value?.length <= 10) {
            setloginData((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }
    }


    const fetchData = async (): Promise<void> => {
        setLoading(true)
        const response = await LoginResponse(loginData)

        if (response.status === "success") {
            const loginResult: userInfo = response?.result;
            SetLocalData("userInfo", loginResult);
            const path: string = param.get("redirectedTo") || "/";
            navigate(path, { replace: true })

        } else {

            setError(response)
        }
        setLoading(false)
    }

    const HandleSubmit = (event: any): void => {
        event.preventDefault()
        fetchData()
    }



    return (
        <>
            <LoginForm
                isLoading={isLoading}
                handleChange={handleChange}
                HandleSubmit={HandleSubmit}
                loginData={loginData}
                redirectedTo={param.get("redirectedTo")}
            />

            <Spinner
                isLoading={isLoading}
            />

            {error && <ErrorToster props={error} />}
        </>
    )
}