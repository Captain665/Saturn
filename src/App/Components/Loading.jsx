import React from "react";
import { FaSpinner, FaCircleNotch } from "react-icons/fa6";

export default function IsLoading() {

    return (
        <>
        <div className="w-full bg-transparent">
            <p className="h-screen w-fit m-auto flex items-center text-4xl animate-spin text-orange-500"><FaSpinner /></p>
        </div>
        </>
    )
}