import React, { memo } from "react";
import { ImSpinner2 } from "react-icons/im";


function Spinner({ isLoading }) {

    return (
        <>
            {isLoading ?
                <dialog open className="flex m-auto h-full bg-transparent justify-center">
                    <ul className="w-fit h-fit flex m-auto justify-end fixed bottom-10 bg-black text-lg items-center gap-2 shadow-2xl px-5 p-2 z-50 rounded-lg">
                        <ImSpinner2 className="animate-spin text-white text-base font-extrabold" />
                        <li className=" text-xl text-white">Loading...</li>
                    </ul>
                </dialog>
                : null
            }
        </>
    )
} 

export default memo(Spinner);