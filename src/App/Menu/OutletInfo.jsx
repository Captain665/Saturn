import React, { memo } from "react";
import { FaStar, FaArrowLeft, FaPersonBiking } from "react-icons/fa6";

function OutletInfo({ backToOutlet, trainDetail, stationInfo, outletInfo }) {


    return (
        <>
            <ul className="">
                <ul className="m-3">
                    <li className="text-xl font-thin text-zinc-700" onClick={backToOutlet}><FaArrowLeft /></li>
                    <li className="text-2xl font-bold mt-2">{outletInfo.outletName}</li>
                </ul>

                <ul className="m-3 flex flex-col gap-2 p-3 shadow rounded-xl from-slate-800 border-2">
                    <li className="flex gap-2 justify-start font-bold items-center">
                        <li><FaStar className="text-white bg-green-600 p-1 rounded-full text-xl" /> </li>
                        <li className="font-bold text-lg">{outletInfo.ratingValue}</li>
                        {outletInfo.ratingCount && <li>({outletInfo.ratingCount}k + ratings)</li>}
                        <li className="text-gray-500 text-xs">•</li>
                        <li> &#x20B9;{outletInfo.minOrderValue} Min</li>
                    </li>
                    <li className=" truncate">{outletInfo.tags}</li>
                    <li className="flex gap-3">
                        <li className="text-gray-500">•</li>
                        <li className="font-bold">Outlet</li>
                        <li className="text-gray-500">{outletInfo.stationCode}</li>
                    </li>
                    <hr />
                    <li className="flex gap-2 items-center">
                        <li className="text-xl"><FaPersonBiking /> </li>
                        {outletInfo.deliveryCost 
                        ? <li>&#x20B9;{outletInfo.deliveryCost} Delivery fee will apply</li> 
                        : <li>Free Delivery</li>}
                    </li>
                </ul>
            </ul>


            {/* <p className="bg-gray-200 p-2 mx-0.5"><span onClick={backToOutlet} className="cursor-pointer"><span className="font-bold text-2xl w-1/2 md:pl-8 ">&#x2190;</span>  Outlets</span></p>
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
            </div> */}
        </>
    )
}

export default memo(OutletInfo);
