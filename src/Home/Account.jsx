import React from "react";
import { useSearchParams } from "react-router-dom";
import LoginForm from "./Form/Login";
import Signup from "./Form/Signup";
import Validate from "./Form/Validate";

export default function Account() {
    const [param] = useSearchParams()
    const formSet = param.get("form")

    function DisplayForm(item) {
        if (item === "signup") {
            return <Signup />
        } else if (item === "verify") {
            return <Validate />
        } else {
            return <LoginForm />
        }
    }


    return (
        <div className="p-5 self-center shadow-xl flex flex-col h-fit w-full mt-6 mb-10 rounded-3xl"><br />
            {DisplayForm(formSet)}
        </div>
    )











}