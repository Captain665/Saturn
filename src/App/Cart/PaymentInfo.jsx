import React from "react";

export default function PaymentInfo({ subTotal, taxes, deliveryCharge, payable, createOrder}) {
    return (
        <>
            <div className="self-center w-2/5 h-fit">
                <ul className="bg-white rounded border-2">
                    <p className="text-center bg-rose-300 p-5 text-xl font-medium rounded">Payment Details </p>
                    <ul className="flex p-5 justify-between gap-2">
                        <ul className="text-lg">
                            <li className="">Subtotal : </li>
                            <li>Taxes :</li>
                            <li>Delivery Charges :</li>
                            <li className="font-bold">Total Payable : </li>
                        </ul>
                        <ul className="text-lg">
                            <li>&#x20B9;{subTotal}</li>
                            <li>&#x20B9;{taxes}</li>
                            <li>&#x20B9;{deliveryCharge}</li>
                            <li className="font-bold">&#x20B9;{payable}</li>
                        </ul>
                    </ul>
                    <button type="submit" className="bg-rose-500 w-full p-2 text-xl rounded border-none" onClick={createOrder}>Place Order</button>
                </ul>
            </div>
        </>

    )
}