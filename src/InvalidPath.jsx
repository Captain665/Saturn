import React from "react";
import { useNavigate } from "react-router";

export default function NonExistPath(){
    const navigate = useNavigate();

    function onClickHandle(){
        navigate("/")
    }

    return(
        <div className="w-full flex justify-center self-center m-10 gap-10" >
            <img src="https://t3.ftcdn.net/jpg/04/54/72/12/240_F_454721218_G91nkzBRgx3gqLmXIV9QWa1opYel9DYH.jpg" alt="" />
            <ul className="bg-rose-100 text-xl rounded-md shadow-lg items-center w-fit h-fit p-10 m-auto">
                <li className="text-center p-5 text-2xl font-bold">This is not valid Path</li>
                <li onClick={onClickHandle} className="bg-rose-500 p-2 border-none rounded-lg text-white text-center cursor-pointer">Go to Home</li>
            </ul>
        </div>
    )
}