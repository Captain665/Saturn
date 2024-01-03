import React from "react";
import { useSearchParams } from "react-router-dom";
import LoginForm from "./Form/Login";
import Signup from "./Form/Signup";
import Validate from "./Form/Validate";

export default function Account() {
    const [param] = useSearchParams()
    const formSet = param.get("form")
    const userDataExist = localStorage.getItem("userInfo")

    const accountInfo = <h1>This is Account info</h1>

    function DisplayForm() {
        if (formSet === "signup") {
            return <Signup />
        } else if (formSet === "verify") {
            return <Validate />
        } else {
            return <LoginForm />
        }
    }

    return (
        <div className="p-5 self-center shadow-xl flex flex-col h-fit w-full mt-6 mb-10 rounded-3xl"><br />
            {userDataExist ? accountInfo : DisplayForm()}
        </div>
    )











}