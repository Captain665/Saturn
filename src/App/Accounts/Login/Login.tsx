import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./Login.html";
import Spinner from "../../Components/Spinner";
import { errorState, userInfo } from "../../CommonTypes/CommonType"
import { SetLocalData, SetSessionData } from "../../Components/CustomHooks";
import { PostRequest } from "../../ApiCall/ApiCall";
import { AxiosResponse } from "axios";

export default function Login() {
    const [param, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const [loginData, setloginData] = useState<{ mobileNumber: string; password: string }>({ mobileNumber: "", password: "" })
    const [isLoading, setLoading] = useState<boolean>(false)

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

        const respone: AxiosResponse<any, any> = await PostRequest(loginData, "/auth/login");

        if (respone.status != 200) {
            setSearchParams(param => {
                param.set("error", respone.data.error)
                param.set("status", JSON.stringify(respone.status))
                return param;
            })
        } else {
            const loginResult: userInfo = respone?.data.result;
            SetLocalData("userInfo", loginResult);
            const path: string = param.get("redirectedTo") || "/";
            navigate(path, { replace: true })
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

        </>
    )
}