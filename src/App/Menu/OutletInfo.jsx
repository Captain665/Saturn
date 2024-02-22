import React, { memo } from "react";
import { FaStar, FaChevronLeft } from "react-icons/fa6";

function OutletInfo({ backToOutlet, trainDetail, stationInfo, outletInfo }) {

    return (
        <>
            <ul>
                <li><FaChevronLeft /></li>
                <ul className="hidden">
                    <li>
                        <img src={outletInfo?.logoImage} alt="" />
                    </li>
                </ul>
                <ul>
                    <ul>
                        <li>{outletInfo.outletName}</li>
                    </ul>
                    <ul>
                        <li>
                            <ul>
                                <li>{outletInfo.ratingValue}</li>
                                <li>{outletInfo.ratingCount}</li>
                            </ul>
                            <ul>
                                <li>{outletInfo.minOrderValue}</li>
                            </ul>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li><hr />
                        <li></li>
                        
                    </ul>
                </ul>
            </ul>


            <p className="bg-gray-200 p-2 mx-0.5"><span onClick={backToOutlet} className="cursor-pointer"><span className="font-bold text-2xl w-1/2 md:pl-8 ">&#x2190;</span>  Outlets</span></p>
            <div className="w-full flex flex-col justify-center self-center items-center md:p-5">
                <div className="flex w-11/12 md:p-5 md:h-60 h-32 shadow">
                    <div className="w-1/5 shadow-md rounded-md hidden md:block">
                        <div className="bg-sky-500 opacity-80 h-1/2 text-white p-3">
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
                    <div className="md:w-3/5 md:pl-10 flex flex-col w-full p-2">
                        <p className="md:text-4xl text-2xl font-semibold">{outletInfo?.outletName}</p><hr />
                        <p className="md:text-lg md:mt-4 text-sm mt-2 ml-2">Minimum Order &#x20B9;{outletInfo?.minOrderValue}</p>
                        <div className="flex md:text-lg md:gap-3 md:mt-2 text-sm gap-1 mt-2 ml-2">
                            <p className="text-[#FFD700] md:text-xl"><FaStar /></p>
                            <p className="">{outletInfo?.ratingValue}</p>
                            <p className="">Based on {outletInfo?.ratingCount} Ratings</p>
                        </div>
                        <p className="text-sm ml-2 w-fit p-1 rounded-lg">{outletInfo.deliveryCost !== 0 ? null : "Free Delivery"}</p>
                    </div>
                    <div className="md:w-1/5 rounded-sm w-2/5 bg-gray-300 md:h-28 h-24">
                        <img src={outletInfo?.logoImage} alt="logo" className="object-center w-full h-full" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(OutletInfo);
