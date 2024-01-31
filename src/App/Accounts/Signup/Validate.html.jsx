import React from "react";
import { NavLink } from "react-router-dom";
import IsLoading from "../../../Loading";

export default function ValidateHtml({ handleOtpChange, handleOtpSubmit, isLoading, emailId, otp }) {

    return (
        <>
            {isLoading
                ? <IsLoading />
                : <div><br /><br />
                    <h1 className="md:text-4xl font-bold text-center text-2xl">Email Verification</h1><br />

                    <form action="" onSubmit={handleOtpSubmit} method="post" className="flex justify-center flex-col mx-auto w-3/4 max-w-2xl">
                        <label htmlFor="email">Email Id</label>
                        <input type="email" placeholder="Email Id"
                            name="email" id="email" value={emailId} disabled className="border rounded-lg h-10 pl-2 outline-none " /><br />

                        <label htmlFor="number">OTP</label>
                        <input type="number" name="mobileNumber" id="number" onChange={handleOtpChange} value={otp}
                            required placeholder="OTP" className="border rounded-lg h-10 pl-2 outline-none" /><br />

                        <button type="submit" className="bg-rose-500 h-10 border-none rounded text-white text-xl">Submit</button>
                    </form><br />
                    <p className="text-center">Have an Account ?  <NavLink to="/login" className="text-rose-400"> Sign in</NavLink></p><br /><br />
                </div>
            }
        </>
    )
}