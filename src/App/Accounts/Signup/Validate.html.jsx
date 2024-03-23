import React from "react";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa6";

export default function ValidateHtml({ handleOtpChange, handleOtpSubmit, isLoading, emailId, otp, redirectedTo }) {

    const path = redirectedTo ? `/login?redirectedTo=${redirectedTo}` : "/login"

    return (
        <>
            <form
                className="border md:p-10 p-5 md:px-12 px-6 flex flex-col justify-center w-fit m-auto mt-20
                items-center bg-transparent gap-5 rounded-xl self-center place-content-center md:shadow-xl"
                method="post"
                onSubmit={handleOtpSubmit}
            >

                <ul className="text-8xl text-gray-300 opacity-90">
                    <li><FaEnvelope /></li>
                </ul>

                <ul className="flex border items-center h-10 bg-gray-100 gap-2">
                    <li className="bg-white p-2 w-full h-full px-3">
                        <FaEnvelope />
                    </li>
                    <li>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Id"
                            disabled
                            className="bg-gray-100 outline-none"
                            value={emailId}
                        />
                    </li>
                </ul>

                <ul className="flex border items-center h-10 bg-gray-100 gap-2">
                    <li className="bg-white p-2 w-full h-full px-3">
                        <FaKey />
                    </li>
                    <li>
                        <input
                            type="number"
                            name="otp"
                            id="otp"
                            placeholder="OTP"
                            required
                            className="bg-gray-100 outline-none"
                            onChange={handleOtpChange}
                            value={otp}
                        />
                    </li>
                </ul>

                <button
                    type="submit"
                    className="bg-[#60b246] w-full text-white
                        font-extrabold h-10 inline-flex justify-center text-xl cursor-pointer items-center"
                    disabled={isLoading}
                >Submit</button>


                <ul className="flex gap-1 text-sm">
                    <li>Have an Account ?</li>
                    <NavLink to={path} className="text-sky-400">Sign in</NavLink>
                </ul>
            </form>
        </>
    )
}