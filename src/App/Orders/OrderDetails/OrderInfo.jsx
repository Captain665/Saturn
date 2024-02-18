import React from "react";
import CustomerAndPaymentInfo from "./CustomerAndPaymentInfo";
import OrderedItems from "./OutletAndMenu";
import IsLoading from "../../../App/Components/Loading";

export default function OrderInfo({ order, isLoading, backToHome }) {


    return (
        <>{isLoading ? <IsLoading /> :
            order && <div className="">
                <div className="bg-gray-200 flex items-center w-full text-lg md:pl-5 p-2">
                    <h1 onClick={backToHome} className="cursor-pointer">&#x2190; Back to Home</h1>
                </div>
                <h1 className="md:text-4xl md:ml-14 ml-5 md:mt-5 mb-2 text-2xl">Order Details</h1>
                <div className="flex flex-col items-center">
                    <div className="md:w-11/12 bg-sky-200 rounded-xl shadow-2xl w-full">
                        <div className="flex justify-between md:p-5 p-2">
                            <ul className="content-center items-center w-1/2">
                                <li className="text-lg font-bold cursor-pointer">Order ID: #{order.id}</li>
                                <li>{order.bookingDate}</li>
                                <li className="w-14 rounded-md bg-gray-300"><img src={order.outlets.logoImage} alt="logo" className="object-contain" /></li>
                                <li className="text-xl font-bold">{order.outlets.outletName}</li>
                            </ul>
                            <ul className="font-bold w-1/2 inline-flex md:justify-center justify-end self-start">
                                <li className="border-none md:p-2 p-1 bg-green-400 rounded-lg">{order.status}</li>
                            </ul>
                        </div>

                        <CustomerAndPaymentInfo
                            order={order}
                        />
                        <OrderedItems
                            order={order}
                        />

                    </div>
                </div><br /><br />

            </div>}
        </>
    )
}