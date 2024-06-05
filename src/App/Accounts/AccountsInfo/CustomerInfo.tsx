import React, { useState } from "react";
import { FaCircleUser, FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { GetLocalData } from "../../Components/CustomHooks";
import { userInfo } from "../../CommonTypes/CommonType";

export default function CustomerDetails() {

    const navigate = useNavigate();

    const [info] = useState<userInfo>(GetLocalData("userInfo"));


    const LogOut = (): void => {
        localStorage.clear();
        navigate("/")
        window.location.reload();
    }

    const HandleBack = (): void => {
        navigate("/account")
    }



    return (
        <div className="w-11/12 md:w-4/6 flex flex-col m-auto mt-5 gap-2 md:mt-20">
            <ul
                onClick={HandleBack}
                className="text-lg flex md:hidden items-center gap-2 opacity-70 w-fit cursor-pointer"
            >
                <FaArrowLeft />
                <li>Back</li>
            </ul>
            <ul className="hidden md:block font-bold text-2xl text-center md:text-start">
                <li>Account</li>
            </ul>

            <ul className="flex flex-col self-center items-center p-5 gap-4 w-full md:px-20">

                <li className="text-9xl text-gray-400 opacity-80">
                    <FaCircleUser />
                </li>

                <fieldset className="border py-0.5 px-3 w-full rounded border-black border-opacity-30" disabled>
                    <legend className="opacity-50 text-sm">Full Name</legend>
                    <li className="text-xl opacity-80">{info?.fullName}</li>
                </fieldset>

                <fieldset className="border py-0.5 px-3 w-full rounded border-black border-opacity-30" disabled >
                    <legend className="opacity-50 text-sm">Phone number</legend>
                    <li className="text-xl opacity-80">{info?.mobileNumber}</li>
                </fieldset>

                <fieldset className="border py-0.5 px-3 w-full rounded border-black border-opacity-30">
                    <legend className=" opacity-50 text-sm">Email address</legend>
                    <li className="text-xl opacity-80">{info?.emailId}</li>
                </fieldset>
                <fieldset className="border py-0.5 px-3 w-full rounded border-black border-opacity-30">
                    <legend className=" opacity-50 text-sm">Gender</legend>
                    <li className="text-xl opacity-80">{info?.gender}</li>
                </fieldset>


            </ul>
            <hr className="md:hidden" />

            <ul
                onClick={LogOut}
                className="md:hidden p-2 border mt-5 rounded-md w-fit bg-red-500 text-white font-extrabold self-end cursor-pointer"
            >
                <button>LOGOUT</button>
            </ul>

        </div>
    )
}