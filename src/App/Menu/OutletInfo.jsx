import React, { memo } from "react";
import { FaStar } from "react-icons/fa6";

function OutletInfo({ backToOutlet, trainDetail, stationInfo, outletInfo }) {

    return (
        <>
            <p className="bg-rose-50 cursor-pointer p-2" onClick={backToOutlet}><span className="font-bold text-2xl w-1/2 pl-8 ">&#x2190;</span>  Outlets</p>
            <div className="w-full flex flex-col justify-center self-center items-center p-5">
                <div className="flex w-11/12 p-5 h-60 shadow">
                    <div className="w-1/5 shadow-md rounded-md">
                        <div className="bg-rose-500 opacity-80 h-1/2 text-white p-3">
                            <p className="text-sm">Delivery Details</p>
                            <p><span className="pt-1 text-lg font-semibold">{trainDetail?.name}</span> <span className="font-bold">({trainDetail?.trainNo})</span></p>
                            <p className="text-sm pt-2"><span>On {stationInfo?.depDate}</span><span>, at {stationInfo?.departure}</span></p>
                        </div>
                        <div className="p-3">
                            <p className="text-sm">Delivery Station</p>
                            <p className="text-xl font-semibold"><span>{stationInfo?.name}</span> <span>({stationInfo?.code})</span></p>
                            <p><span>{(stationInfo?.delayArrival === 0 || stationInfo?.delayArrival === null) ? "On time " : "Late by " + stationInfo?.delayArrival + " mins, "}</span>
                                <span>{stationInfo?.halt === "--" ? " Starting station" : " " + stationInfo?.halt + " mins halt"}</span></p>
                        </div>
                    </div>
                    <div className="w-3/5 pl-10 flex flex-col">
                        <p className="text-4xl font-semibold">{outletInfo?.outletName}</p><br /><hr /><br />
                        <p><span className="text-lg">Minimum Order &#x20B9;{outletInfo?.minOrderValue}</span></p><br />
                        <div className="flex text-lg gap-3">
                            <p className="text-[#FFD700] text-xl"><FaStar /></p>
                            <p className="">{outletInfo?.ratingValue}</p>
                            <p className="">Based on {outletInfo?.ratingCount} Ratings</p>
                        </div>
                        <p className="">{outletInfo?.deliveryCost > 0 ? "" : "Free Delivery"}</p>
                    </div>
                    <div className="w-1/5 rounded-sm">
                        <img src={outletInfo?.logoImage} alt="logo" className="object-center w-full h-full" />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}

export default memo(OutletInfo);