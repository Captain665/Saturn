import React from "react";
import { NavLink } from "react-router-dom";
import { FaCircleUser, FaMobileRetro, FaLock } from "react-icons/fa6";
import IsLoading from "../../Components/Loading";


export default function LoginForm({ isLoading, handleChange, HandleSubmit, loginData, redirectedTo }) {

    const path = redirectedTo ? `/signup?redirectedTo=${redirectedTo}` : "/signup"



    return (

        <>
            {
                isLoading ? <IsLoading isLoading={isLoading}/> :
                    <form method="post" onSubmit={HandleSubmit}
                        className="border md:p-10 p-5 md:px-12 px-6 flex flex-col justify-center w-fit m-auto mt-20
                 items-center bg-transparent gap-5 rounded-xl self-center place-content-center md:shadow-xl"
                    >
                        <ul className="text-9xl text-gray-300 opacity-80">
                            <FaCircleUser />
                        </ul>

                        <ul className="flex border items-center h-10 bg-gray-100 gap-2">
                            <li className="bg-white p-2 w-full h-full px-3">
                                <FaMobileRetro />
                            </li>
                            <li>
                                <input type="number"
                                    className="bg-gray-100 outline-none"
                                    placeholder="Mobile Number"
                                    required
                                    onChange={handleChange}
                                    value={loginData?.mobileNumber}
                                    maxLength={10}
                                    minLength={10}
                                    name="mobileNumber"
                                    id="mobileNumber"
                                />
                            </li>
                        </ul>

                        <ul className="flex border items-center h-10 bg-gray-100 gap-2">
                            <li className="bg-white p-2 w-full h-full px-3">
                                <FaLock />
                            </li>
                            <li>
                                <input type="password"
                                    className="bg-gray-100 outline-none"
                                    placeholder="Password"
                                    required
                                    onChange={handleChange}
                                    value={loginData?.password}
                                    name="password"
                                    id="password"
                                />
                            </li>
                        </ul>

                        <ul className="bg-[#60b246] w-full text-white hover:opacity-80
                                        font-extrabold h-10 inline-flex justify-center text-xl cursor-pointer">
                            <button type="submit">LOGIN</button>
                        </ul>

                        <ul className="flex gap-1 text-sm">
                            <li className="opacity-80">Don't have an Account ?</li>
                            <NavLink to={path} className="text-sky-400">Create Account</NavLink>
                        </ul>

                    </form>

            }
        </>
    )
}