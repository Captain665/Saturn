import React from "react";
import { useNavigate } from "react-router";

export default function NonExistPath(){
    const navigate = useNavigate();

    function onClickHandle(){
        navigate("/")
    }

    return(
        <div className="w-fit flex flex-col justify-center self-center h-screen">
            <ul className="bg-rose-100 p-36 text-xl rounded-md shadow-lg items-center">
                <li className="text-center p-5 text-2xl font-bold">This is not valid Path</li>
                <li onClick={onClickHandle} className="bg-rose-500 p-2 border-none rounded-lg text-white text-center cursor-pointer">Go to Home</li>
            </ul>
        </div>
    )
}