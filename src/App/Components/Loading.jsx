import React from "react";
import { FaCircleNotch } from "react-icons/fa6";

export default function IsLoading({ isLoading }) {


    return (
        <>
            <dialog open className="flex m-auto h-full bg-transparent justify-center">
                <ul className="w-fit h-fit flex m-auto justify-end bg-white text-xl items-center gap-2 px-5 p-2">
                    <FaCircleNotch className="animate-spin text-gray-500" />
                    <li className="text-normal">Loading...</li>
                </ul>
            </dialog>
        </>
    )
}

