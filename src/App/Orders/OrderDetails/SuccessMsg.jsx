import React from "react";
import { FaCheck } from "react-icons/fa6";

export default function SuccessPlacedConfirm({ orderId, shown, handleOnClick }) {

    return (
        <dialog open={shown} className="top-52">
            <ul className="w-fit bg-gray-200 m-auto h-fit flex flex-col justify-center place-content-center text-center p-5 px-16 rounded-lg">
                <strong className="text-3xl font-extrabold mt-8">Your order has been received</strong>
                <p className="bg-green-600 mt-10 flex justify-center m-auto w-12 h-12 rounded-full items-center text-white font-extrabold text-3xl"><FaCheck /></p>
                <p className="text-xl mt-3 font-medium">Thank you for your purchase !</p>
                <p className="mt-1">Your order ID is : {orderId}</p>
                <p className="text-sm mt-1">You will receive an order confirmation email with details of your order.</p>
                <button className="bg-orange-500 mt-6 mb-8 text-white font-extralight p-2 w-fit m-auto px-5 rounded-xl" onClick={handleOnClick}>CONTINUE SHOPPING</button>
            </ul>
        </dialog>

    )
}