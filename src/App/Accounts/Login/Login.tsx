import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./Login.html";
import Spinner from "../../Components/Spinner";
import { errorState, userInfo } from "../../CommonTypes/CommonType"
import { SetLocalData } from "../../Components/CustomHooks";
import { PostRequest } from "../../ApiCall/AxiosRequest";
import { AxiosResponse } from "axios";
import ErrorToster from "../../Components/MessageToggle";

export default function Login() {
    const [param] = useSearchParams()
    const navigate = useNavigate()

    const [loginData, setloginData] = useState<{ mobileNumber: string; password: string }>({ mobileNumber: "", password: "" })
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<errorState>();

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

    const fetchData = async (): Promise<void> => {
        setLoading(true)

        const respone: AxiosResponse<any, any> = await PostRequest(loginData, "/auth/login");

        if (respone.status !== 200) {
            const errorMessage: errorState = {
                status: respone.status,
                error: respone.data.error,
                result: respone.data.result
            }
            setError(errorMessage)
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

            {error && <ErrorToster props={error} />}
        </>
    )
}