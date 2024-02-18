import React from "react";
import { FaSpinner } from "react-icons/fa6";

export default function IsLoading() {

    return (
        <>
        <div className="w-full">
            <p className="h-screen w-fit m-auto flex items-center text-4xl animate-spin bg-transparent text-sky-400"><FaSpinner /></p>
        </div>
        </>
    )
}