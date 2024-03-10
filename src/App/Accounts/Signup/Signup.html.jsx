import React from "react";
import { NavLink } from "react-router-dom";
import IsLoading from "../../Components/Loading";
import { FaUser, FaMobileRetro, FaEnvelope, FaLock } from "react-icons/fa6";

export default function SignupData({ userInfo, handleSubmit, handleOnChange, isloading, redirectedTo }) {

    const path = redirectedTo ? `/login?redirectedTo=${redirectedTo}` : "/login"


    return (
        <>{
            isloading ? <IsLoading /> :

                <form
                    className="border md:p-10 p-5 md:px-20 px-6 flex flex-col justify-center w-fit m-auto mt-16
                               items-center bg-transparent gap-5 rounded-xl self-center place-content-center md:shadow-xl"
                    method="post"
                    onSubmit={handleSubmit}
                >

                    <ul className="text-3xl font-extrabold">
                        <li>Sign Up</li>
                    </ul>

                    <ul className="flex border items-center h-10 bg-gray-100 gap-2">
                        <li className="bg-white p-2 w-full h-full px-3">
                            <FaUser />
                        </li>
                        <li>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Name"
                                required
                                onChange={handleOnChange}
                                value={userInfo.fullName}
                                className="bg-gray-100 outline-none"
                            />
                        </li>
                    </ul>

                    <ul className="flex border items-center h-10 bg-gray-100 gap-2">
                        <li className="bg-white p-2 w-full h-full px-3">
                            <FaMobileRetro />
                        </li>
                        <li>
                            <input
                                type="number"
                                name="mobileNumber"
                                id="number"
                                placeholder="Mobile Number"
                                required
                                onChange={handleOnChange}
                                value={userInfo.mobileNumber}
                                className="bg-gray-100 outline-none"
                            />
                        </li>
                    </ul>

                    <ul className="flex border items-center h-10 bg-gray-100 gap-2">
                        <li className="bg-white p-2 w-full h-full px-3">
                            <FaEnvelope />
                        </li>
                        <li>
                            <input
                                type="email"
                                name="emailId"
                                id="emailId"
                                placeholder="Email Id"
                                required
                                onChange={handleOnChange}
                                value={userInfo.emailId}
                                className="bg-gray-100 outline-none"
                            />
                        </li>
                    </ul>

                    <ul className="flex border items-center h-10 bg-gray-100 gap-2">
                        <li className="bg-white p-2 w-full h-full px-3">
                            <FaLock />
                        </li>
                        <li>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                required
                                onChange={handleOnChange}
                                value={userInfo.password}
                                className="bg-gray-100 outline-none"
                            />
                        </li>
                    </ul>

                    <select
                        className="flex border items-center h-10 bg-gray-100 gap-2 w-full px-2 outline-none"
                        name="gender"
                        id="gender"
                        required
                        onChange={handleOnChange}
                        value={userInfo.gender}
                    >
                        <option value="" >Please select one...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>

                    </select>

                    <ul className="bg-[#60b246] w-full text-white
                        font-extrabold h-10 inline-flex justify-center text-xl cursor-pointer">
                        <button>
                            Get OTP
                        </button>
                    </ul>

                    <ul className="flex gap-1 text-sm">
                        <li>Have an Account ?</li>
                        <NavLink to={path} className="text-sky-400">Sign In</NavLink>
                    </ul>

                </form>
        }

        </>
    )
}