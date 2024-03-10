import React from "react";
import { FaArrowLeft, FaChevronRight, FaWallet, FaCreditCard, FaBuildingColumns, FaMoneyBill1 } from "react-icons/fa6";
import IsLoading from "../Components/Loading";
import ErrorToster from "../Components/MessageToggle";

export default function PaymentInfo({ paymentMode, proceedToPay, mode, totalAmount, backToCart, isLoading, error, totalItem }) {

    const payMode = () => {
        return mode && mode?.toUpperCase();
    }
    if (isLoading) {
        return <IsLoading />
    }


    return (
        <>
            <div className="md:w-2/5 w-11/12 m-auto md:mt-10 mt-5">
                <ul className="flex items-center gap-3">
                    <li><FaArrowLeft className="text-lg cursor-pointer" onClick={backToCart} /></li>
                    <ul>
                        <li className="font-bold text-xl"> Payment Options</li>
                        <ul className="flex items-center gap-1 text-gray-500 text-sm">
                            <li>{totalItem} items</li>
                            <li className="text-xs">•</li>
                            <li>Total: &#x20B9;{totalAmount}</li>
                        </ul>
                    </ul>
                </ul>
                <ul className="m-auto mt-10 flex flex-col gap-2">

                    <ul className={`border flex items-center justify-between px-2 h-16 p-2 rounded cursor-pointer 
                ${mode === "Razorpay" ? "bg-green-200" : null}`} onClick={() => paymentMode("Razorpay")}>
                        <li className="w-1/5 ml-5">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="" className="h-full w-full" />
                        </li>
                        <li><FaChevronRight /></li>
                    </ul>

                    <ul className={`border flex items-center justify-between px-2 h-16 p-2 rounded cursor-pointer 
                ${mode === "Paytm" ? "bg-green-200" : null}`} onClick={() => paymentMode("Paytm")}>
                        <li className="w-2/12 ml-5">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" alt="" className="h-full w-full" />
                        </li>
                        <li><FaChevronRight /></li>
                    </ul>

                    <ul className={`border flex items-center justify-between px-2 h-16 p-2 rounded cursor-pointer 
                ${mode === "Paypal" ? "bg-green-200" : null}`} onClick={() => paymentMode("Paypal")}>
                        <li className="w-1/5 ml-5">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK36JZxT4uTNuzmYyLMi6SD0vEH14dNLWKBA&usqp=CAU" alt="" className="h-full w-full" />
                        </li>
                        <li><FaChevronRight /></li>
                    </ul>

                </ul>

                <ul className="mt-10 mb-20">
                    <li className="font-bold text-xl">• More Payment Options</li>

                    <ul className="m-auto mt-10 flex flex-col gap-2">

                        <ul className={`border flex items-center h-16 rounded justify-between px-2 cursor-pointer ${mode === "Wallet" ? "bg-green-200" : null}`} onClick={() => paymentMode("Wallet")}>
                            <ul className="flex">
                                <li className="p-1 border m-2 rounded-md text-lg ml-3"><FaWallet /></li>
                                <ul className="ml-2">
                                    <li className="text-lg">Wallets</li>
                                    <li className="text-sm text-gray-500">Paytm, PhonePe, Amazon Pay & more</li>
                                </ul>
                            </ul>
                            <li className=""><FaChevronRight /></li>
                        </ul>

                        <ul className={`border flex items-center h-16 rounded justify-between px-2 cursor-pointer ${mode === "Card" ? "bg-green-200" : null}`} onClick={() => paymentMode("Card")}>
                            <ul className="flex">
                                <li className="p-1 border m-2 rounded-md text-lg ml-3"><FaCreditCard /></li>
                                <ul className="ml-2">
                                    <li className="text-lg">Cards</li>
                                    <li className="text-sm text-gray-500">Credit, Debit & ATM Cards</li>
                                </ul>
                            </ul>
                            <li className=""><FaChevronRight /></li>
                        </ul>

                        <ul className={`border flex items-center h-16 rounded justify-between px-2 cursor-pointer ${mode === "NetBanking" ? "bg-green-200" : null}`} onClick={() => paymentMode("NetBanking")}>
                            <ul className="flex">
                                <li className="p-1 border m-2 rounded-md text-lg ml-3"><FaBuildingColumns /></li>
                                <ul className="ml-2">
                                    <li className="text-lg">Netbanking</li>
                                    <li className="text-sm text-gray-500">Select from a list of banks</li>
                                </ul>
                            </ul>
                            <li className=""><FaChevronRight /></li>
                        </ul>

                        <ul className={`border flex items-center h-16 rounded justify-between px-2 cursor-pointer ${mode === "CASH" ? "bg-green-200" : null}`} onClick={() => paymentMode("CASH")}>
                            <ul className="flex">
                                <li className="p-1 border m-2 rounded-md text-lg ml-3"><FaMoneyBill1 /></li>
                                <ul className="ml-2">
                                    <li className="text-lg">Pay on Delivery</li>
                                    <li className="text-sm text-gray-500">Pay in cash or pay online</li>
                                </ul>
                            </ul>
                            <li className=""><FaChevronRight /></li>
                        </ul>
                    </ul>
                </ul>
            </div>

            <ul className="flex justify-center">
                <ul className={`self-center flex justify-center fixed bottom-0 content-center bg-[#60b646] md:w-2/5 w-full h-16 md:h-auto font-extrabold text-lg
            cursor-pointer text-center z-50 text-white ${mode ? "block" : "hidden"} md:rounded-md`}
                    onClick={proceedToPay}>
                    <button className="p-2">PAY &#x20B9;{totalAmount} WITH {payMode()}</button>
                </ul>
            </ul>

            <ErrorToster props={error} />   

        </>
    )
}