import React, { memo } from "react";
import { FaArrowLeft, FaChevronRight, FaWallet, FaCreditCard, FaBuildingColumns, FaMoneyBill1 } from "react-icons/fa6";

function PaymentInfo({ paymentMode, proceedToPay, mode, totalAmount, backToCart, isLoading, totalItem, paymentOption }) {

    console.log(paymentOption)
    const payMode = () => {
        return mode && mode?.toUpperCase();
    }

    const iconForMethod = (methodLogo) => {
        if (methodLogo === "FaWallet") {
            return <FaWallet />
        }
        if (methodLogo === "FaCreditCard") {
            return <FaCreditCard />
        }
        if (methodLogo === "FaBuildingColumns") {
            return <FaBuildingColumns />
        }
        if (methodLogo === "FaMoneyBill1") {
            return <FaMoneyBill1 />
        }
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
                    {paymentOption?.paymentGateways?.map(option => (
                        <ul className={`border flex items-center justify-between px-2 h-16 p-2 rounded cursor-pointer 
                        ${mode === option?.name ? "bg-green-200" : null}`} onClick={() => paymentMode(option?.name)} key={option?.id}>
                            <li className="w-1/5 ml-5">
                                <img src={option?.gatewayLogo} alt="" className="h-full w-full" />
                            </li>
                            <li><FaChevronRight /></li>
                        </ul>
                    ))}
                </ul>

                <ul className="mt-10 mb-20">
                    <li className="font-bold text-xl">• {paymentOption?.title}</li>

                    <ul className="m-auto mt-10 flex flex-col gap-2">

                        {paymentOption?.paymentMethods?.map(method => (
                            <ul className={`border flex items-center h-16 rounded justify-between px-2 cursor-pointer ${mode === method?.name ? "bg-green-200" : null}`} onClick={() => paymentMode(method?.name)} key={method?.id}>
                                <ul className="flex">
                                    <li className="p-1 border m-2 rounded-md text-lg ml-3">{iconForMethod(method?.methodLogo)}</li>
                                    <ul className="ml-2">
                                        <li className="text-lg">{method?.name}</li>
                                        <li className="text-sm text-gray-500">{method?.description}</li>
                                    </ul>
                                </ul>
                                <li className=""><FaChevronRight /></li>
                            </ul>

                        ))}
                    </ul>
                </ul>
            </div >

            <ul className="flex justify-center">
                <ul className={`self-center flex justify-center fixed bottom-0 content-center bg-[#60b646] md:w-2/5 w-full h-16 md:h-auto font-extrabold text-lg
            cursor-pointer text-center z-50 text-white ${mode ? "block" : "hidden"} md:rounded-md`}
                    onClick={proceedToPay}>
                    <button
                        type="submit"
                        className="p-2"
                        disabled={isLoading}
                    >
                        PAY &#x20B9;{totalAmount} WITH {payMode()}
                    </button>
                </ul>
            </ul>


        </>
    )
}

export default memo(PaymentInfo);