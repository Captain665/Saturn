import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginForm() {

    const [loginData, setloginData] = useState({ mobileNumber: "", password: "" })
    const [context, setContext] = useState({ error: null, isLoading: false })
    const navigate = useNavigate()

    function handleChange(event) {
        const target = event.target;
        setloginData((prevData) => ({
            ...prevData,
            [target.name]: target.value
        }))
    }

    const fetchData = async function loginAPI() {
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
            body: JSON.stringify(loginData)
        };
        try {
            const response = await fetch("auth/login", requestData)
            const resData = await response.json()
            if (response.ok) {
                setContext(() => ({
                    isLoading: false,
                    error: null
                }))
                localStorage.setItem("userInfo", JSON.stringify(resData.result))
                navigate("/")
            } else {
                setContext(() => ({
                    isLoading: false,
                    error: resData.error
                }))
            }
        } catch (error) {
            setContext(() => ({
                isLoading: false,
                error: error
            }))
        }
    }

    function HandleSubmit(event) {
        event.preventDefault()
        fetchData()
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-center" >Login</h1><br />
            {context.error && <p className="text-center text-red-500 font-bold">{context.error}</p>}

            <form onSubmit={HandleSubmit} method="post" className="flex justify-center flex-col mx-auto w-3/4">

                <label htmlFor="mobileNumber">Mobile Number</label>

                <input type="number" placeholder="Mobile Number"
                    name="mobileNumber" id="mobileNumber" required
                    className="border rounded-lg h-10 pl-2 outline-none"
                    onChange={handleChange}
                    value={loginData.mobileNumber}
                /><br />

                <label htmlFor="password">Password</label>

                <input type="password" name="password"
                    id="password" required placeholder="Password"
                    className="border rounded-lg h-10 pl-2 outline-none"
                    onChange={handleChange}
                    value={loginData.password}
                /><br />

                <button type="submit"
                    className="bg-blue-500 h-10 border-none rounded text-white text-xl">
                    {context.isLoading ? "Loading..." : "Sign in"}</button>

            </form><br />

            <p className="text-center">Don't have an Account ?  <NavLink to="?form=signup" className="text-blue-400">Create Account</NavLink></p><br /><br />
        </div>
    )
}