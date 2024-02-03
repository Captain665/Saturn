import React from "react";
import { NavLink } from "react-router-dom";
import IsLoading from "../../../Loading";

export default function LoginForm({ isLoading, handleChange, HandleSubmit, loginData, redirectedTo }) {

    const path = redirectedTo ? `/signup?redirecteTo=${redirectedTo}` : "/signup"


    return (
        <div><br /><br /><br />
            {isLoading ? <IsLoading /> :
                <>
                    <h1 className="md:text-4xl font-bold text-center text-2xl" >Login</h1><br />

                    <form onSubmit={HandleSubmit} method="post" className="flex justify-center flex-col mx-auto w-3/4 max-w-2xl">

                        <label htmlFor="mobileNumber">Mobile Number</label>

                        <input type="number" placeholder="Mobile Number"
                            name="mobileNumber" id="mobileNumber" required
                            className="border rounded-lg h-10 pl-2 outline-none"
                            onChange={handleChange}
                            value={loginData?.mobileNumber}
                            maxLength={10}
                        /><br />

                        <label htmlFor="password">Password</label>

                        <input type="password" name="password"
                            id="password" required placeholder="Password"
                            className="border rounded-lg h-10 pl-2 outline-none"
                            onChange={handleChange}
                            value={loginData?.password}
                        /><br /><br />

                        <button type="submit"
                            className="bg-rose-500 h-10 border-none rounded text-white text-xl hover:bg-rose-400">
                            Sign in</button>

                    </form><br />

                    <p className="text-center">Don't have an Account ?
                        <NavLink to={path} className="text-rose-400 hover:font-bold"> Create Account</NavLink>
                    </p><br /><br /><br />
                </>
            }
        </div>
    )
}