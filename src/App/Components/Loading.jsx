import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

export default function IsLoading({ isLoading }) {
    const [text, setText] = useState("Loading");

    setTimeout(() => {
        if (text === "Loading") {
            setText("Please Wait")
        } else {
            setText("Loading")
        }
    }, 1000)


    return (
        <>
            <dialog open className="flex m-auto h-full bg-transparent justify-center">
                <ul className="w-fit h-fit m-auto bg-white items-center text-center flex flex-col gap-2">
                    <ImSpinner2 className="animate-spin text-black font-extrabold text-lg" />
                    <li className="text-lg font-bold">{text}...</li>
                </ul>
            </dialog>
        </>
    )
}

