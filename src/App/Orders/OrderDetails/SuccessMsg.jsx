import React, { memo } from "react";
import { FaCheck } from "react-icons/fa6";

function SuccessPlacedConfirm({ orderId, shown, handleOnClick }) {

    console.log("success toster running...")

    return (
        <dialog open={shown} className="flex m-auto h-full justify-center w-full fixed z-50 bg-opacity-20 top-0 bg-transparent backdrop-blur-sm p-5">
            <ul className="w-fit bg-white z-50 border-2 shadow-2xl m-auto h-fit flex flex-col justify-center place-content-center text-center md:p-5 md:px-10 rounded-lg">
                <strong className="md:text-3xl font-extrabold mt-8 text-xl">Your order has been received</strong>
                <p className="bg-green-600 md:mt-10 mt-5 flex justify-center m-auto w-12 h-12 rounded-full items-center text-white font-extrabold text-3xl"><FaCheck /></p>
                <p className="md:text-xl text-lg mt-3 font-medium">Thank you for your purchase !</p>
                <p className="mt-1">Your order ID is : {orderId}</p>
                <p className="text-sm mt-1 px-5">You will receive an order confirmation email with details of your order.</p>
                <button className="bg-orange-500 mt-6 mb-8 text-white font-extralight p-2 w-fit m-auto px-5 rounded-xl" onClick={handleOnClick}>CONTINUE SHOPPING</button>
            </ul>
        </dialog>

    )
}

export default memo(SuccessPlacedConfirm);