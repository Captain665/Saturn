import React from "react";
import IsLoading from "../../../Loading";

export default function OrderHtml({ orderslist, isLoading, handleViewOrderDetail }) {


    return (
        <>
            {isLoading ? <IsLoading /> :
                <div>
                    <h1 className="font-bold text-2xl text-center">Order History</h1><br /><br />
                    <div className=" grid md:grid-cols-2 gap-2 w-full">
                        {orderslist?.map(item => (
                            <div className="w-full shadow-lg p-5 flex flex-col gap-y-10 rounded-lg border-2" key={item.id}>
                                <ul className="top-40">
                                    <div className="flex">
                                        <div className="flex justify-start items-center w-4/6">
                                            <img src={item.outlets.logoImage} alt="outlet" className="object-cover overflow-hidden" width={50} height={50} />
                                            <li className="font-bold ml-2">{item.outlets.outletName}</li>
                                        </div>
                                        <div className=" w-2/6 text-end">
                                            <li>{item.paymentType === "CASH_ON_DELIVERY" ? "COD" : item.paymentType}</li>
                                        </div>
                                    </div>
                                    <li className="font-[1] text-[#9c9c9c] text-xs"><span className="text-base">{item.stationName},   </span> {item.stationCode}</li>
                                    <hr />
                                    <li><span className="uppercase text-[#696969] text-xs">Order Number</span> <br />{item.id}</li>
                                    <li><span className="uppercase text-[#696969] text-xs">Status </span> <br />{item.status}</li>
                                    <li><span className="uppercase text-[#696969] text-xs">Total Amount </span><br /> &#x20B9; {item.payable_amount}</li>
                                    <li><span className="uppercase text-[#696969] text-xs">Ordered On </span><br />{item.bookingDate}</li><br />
                                    <li className="p-2 bg-rose-400 w-fit cursor-pointer float-right border-none rounded-xl hover:bg-rose-200" onClick={() => handleViewOrderDetail(item)}><span>View Details</span></li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>}
        </>
    )
}