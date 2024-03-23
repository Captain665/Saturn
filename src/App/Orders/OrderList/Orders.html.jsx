import React from "react";
import IsLoading from "../../../App/Components/Loading";
import { FaArrowLeft } from "react-icons/fa6";

export default function OrderHtml({ orderslist, isLoading, handleViewOrderDetail, handleBack }) {


    return (
        <>
            {isLoading ? <IsLoading isLoading={isLoading}/> :
                <div className="w-11/12 m-auto md:w-5/6 md:mt-20 mt-5">
                    <ul >
                        <ul className="md:hidden text-lg flex items-center gap-2 opacity-70 w-fit cursor-pointer mb-2" onClick={handleBack}>
                            <FaArrowLeft />
                            <li>Back</li>
                        </ul>
                        <li className="font-bold text-2xl text-start">Order History</li>
                    </ul>
                    <br /><br />
                    <div className=" grid md:grid-cols-2 gap-5 w-full">
                        {orderslist?.map(item => (
                            <div className="w-full p-5 flex flex-col gap-y-10 rounded-lg border" key={item.id}>
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
                                    <li className="p-2 w-fit cursor-pointer float-right border-none rounded-xl bg-[#60b246] text-white font-extrabold" onClick={() => handleViewOrderDetail(item)}>
                                        <span>View details</span>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>}
        </>
    )
}