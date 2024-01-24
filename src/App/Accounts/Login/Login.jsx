import React, { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {FaSpinner} from "react-icons/fa6"

export default function LoginForm() {

    const [param, setParams] = useSearchParams()

    const [loginData, setloginData] = useState({ mobileNumber: "", password: "" })
    const [context, setContext] = useState({ error: null, isLoading: false })
    const navigate = useNavigate()

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setloginData((prevData) => ({
            ...prevData,
            [name]: value
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
            const resData = await response.json();
            if (response.ok) {
                setContext(() => ({
                    isLoading: false,
                    error: null
                }))
                localStorage.setItem("userInfo", JSON.stringify(resData.result))
                const path = param.get("path") ? "/"+ param.get("path") : "/"
                navigate(path, {replace : true})
                window.location.reload(true)
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
        <div><br /><br /><br />
            <h1 className="text-4xl font-bold text-center" >Login</h1><br />
            {context.error && <p className="text-center text-red-500 font-bold">{context.error}</p>}

            <form onSubmit={HandleSubmit} method="post" className="flex justify-center flex-col mx-auto w-3/4 max-w-2xl">

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
                /><br /><br />

                <button type="submit" disabled={context.isLoading ? true : false}
                    className="bg-rose-500 h-10 border-none rounded text-white text-xl hover:bg-rose-400">
                    {context.isLoading ? <li className="inline-flex justify-center text-xl"><FaSpinner className="animate-spin"/></li> : "Sign in"}</button>

            </form><br />

            <p className="text-center">Don't have an Account ?  <NavLink to="/signup" className="text-rose-400 hover:font-bold">Create Account</NavLink></p><br /><br /><br />
        </div>
    )
}