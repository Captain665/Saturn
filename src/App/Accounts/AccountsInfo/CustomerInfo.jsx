import React, { useState } from "react";
import { FaCircleUser, FaArrowLeft } from "react-icons/fa6";

export default function CustomerDetails() {

    const [info] = useState(JSON.parse(localStorage.getItem("userInfo")) || null)

    console.log(info)



    return (
        <div className="w-11/12 flex flex-col m-auto mt-5 gap-2">
            <ul className=" text-lg flex items-center gap-2 opacity-70 w-fit cursor-pointer">
                <FaArrowLeft />
                <li>Back</li>
            </ul>

            <ul className="flex flex-col self-center items-center p-5 gap-4 w-full">

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


            </ul><hr />

            <ul className="p-2 border mt-5 rounded-md w-fit bg-red-500 text-white font-extrabold self-end">
                <button>LOGOUT</button>
            </ul>

        </div>
    )
}