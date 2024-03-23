import React from "react";
import { FaCircleNotch } from "react-icons/fa6";


export default function Spinner({ isLoading }) {

    return (
        <>
            {isLoading ?
                <dialog open className="flex m-auto h-full bg-transparent justify-center">
                    <ul className="w-fit h-fit flex m-auto justify-end fixed bottom-10 bg-white border text-lg items-center gap-2 shadow-2xl px-5 p-2 z-50 rounded-md">
                        <FaCircleNotch className="animate-spin text-gray-500" />
                        <li className="text-base">Loading...</li>
                    </ul>
                </dialog>
                : null
            }
        </>
    )
} 