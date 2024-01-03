import React from "react";
import { useNavigate, useSearchParams, NavLink } from "react-router-dom";

export default function Validate() {
    const [params] = useSearchParams()
    const email = params.get("email")
    const mobileNumber = params.get("mobile")
    const [data, setData] = React.useState({ mobileNumber: mobileNumber, otp: "" })
    const [context, setContext] = React.useState({ error: "", isLoading: false })

    const navigate = useNavigate()


    function handleOnChange(event) {
        const target = event.target;
        setData((prevData) => ({
            ...prevData,
            otp: target.value
        }))
    }

    const fetchData = async function validate_api() {
        setContext((prevData) => ({
            ...prevData,
            isLoading: true
        }))
        const requestData = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch("otp-validate", requestData)
            const jsonData = await response.json()
            if (response.ok) {
                const data = JSON.stringify(jsonData.result)
                localStorage.setItem("userInfo", data)
                navigate("/")
            } else {
                setContext((prevData) => ({
                    ...prevData,
                    error : jsonData.error,
                    isLoading: false
                }))
            }
        } catch (err) {
            console.log(err)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetchData()
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-center">Email Verification</h1><br />
            {context.error && <p className="text-center text-red-500 font-bold">{context.error}</p>}

            <form action="" onSubmit={handleSubmit} method="post" className="flex justify-center flex-col mx-auto w-3/4">
                <label htmlFor="email">Email Id</label>
                <input type="email" placeholder="Email Id"
                    name="email" id="email" value={email} disabled className="border rounded-lg h-10 pl-2 outline-none " /><br />

                <label htmlFor="number">OTP</label>
                <input type="number" name="mobileNumber" id="number" onChange={handleOnChange} value={data.otp}
                    required placeholder="OTP" className="border rounded-lg h-10 pl-2 outline-none" /><br />

                <button type="submit" className="bg-gray-600 h-10 border-none rounded text-white text-xl">{context.isLoading ? "Submitting..." : "Submit"}</button>
            </form><br />
            <p className="text-center">Have an Account ?  <NavLink href="?form=login" className="text-blue-400">Sign in</NavLink></p><br /><br />
        </div>
    )
}