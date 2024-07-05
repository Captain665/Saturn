import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./Login.html";
import Spinner from "../../Components/Spinner";
import { errorState, userInfo } from "../../CommonTypes/CommonType"
import { SetLocalData } from "../../Components/CustomHooks";
import ErrorToster from "../../Components/MessageToggle";
import usePostRequest from "../../ApiCall/PostRequest";

export default function Login() {

    const [param] = useSearchParams()
    const navigate = useNavigate()

    const [loginData, setloginData] = useState<{ mobileNumber: string; password: string }>({ mobileNumber: "", password: "" })
    const { data, isLoading, error, fetch } = usePostRequest();
    const [errorMsg, setError] = useState<errorState>();

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
    const msg: string | null = param.get("message");

    useEffect(() => {
        const messages: errorState = {
            status: 400,
            error: msg,
            result: null
        }
        setError(messages)

    }, [msg])

    useEffect(() => {

        if (data) {
            const loginResult: userInfo = data;
            SetLocalData("userInfo", loginResult);
            const path: string = param.get("redirectedTo") || "/";
            navigate(path, { replace: true })
        }
        if (error) {
            setError(error)
        }
    }, [data, error])

    const HandleSubmit = (event: any): void => {
        event.preventDefault()
        fetch("/auth/login", loginData)
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

            {errorMsg && <ErrorToster props={errorMsg} />}
        </>
    )
}