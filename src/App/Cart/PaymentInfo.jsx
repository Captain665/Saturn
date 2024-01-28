import React from "react";

export default function PaymentInfo({ itemList, createOrder, outletInfo}) {

    const subTotal = itemList?.reduce((a, b) => a + (b.basePrice * b.quantity), 0)
    const taxes = JSON.parse((subTotal * 0.05).toFixed(2))
    const deliveryCharge = outletInfo?.deliveryCost;
    const payable = Math.round(subTotal + taxes + deliveryCharge)

    return (
        <>
            <div className="self-center md:w-2/5 h-fit w-full m-1">
                <ul className="bg-white rounded border-2 border-rose-200">
                    <p className="text-center bg-rose-300 p-5 md:text-xl font-medium text-lg">Payment Details </p>
                    <ul className="flex p-5 justify-between gap-2">
                        <ul className="md:text-lg text-sm">
                            <li className="">Item Total : </li>
                            <li>Taxes :</li>
                            <li>Delivery Charge :</li>
                            <li className="font-bold text-2xl mt-2">Grand Total : </li>
                        </ul>
                        <ul className="md:text-lg text-sm">
                            <li>&#x20B9;{subTotal}</li>
                            <li>&#x20B9;{taxes}</li>
                            <li>&#x20B9;{deliveryCharge}</li>
                            <li className="font-bold text-2xl mt-2">&#x20B9;{payable}</li>
                        </ul>
                    </ul>
                    <button type="submit" className="bg-rose-400 w-full p-2 text-xl border-none hover:bg-rose-200 hover:font-bold" onClick={createOrder}>Place Order</button>
                </ul>
            </div><br /><br />
        </>

    )
}