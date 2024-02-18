import React, { memo } from "react";
import { FaChevronRight } from "react-icons/fa6";


function StationData({ stations, handleOnClick }) {

    return (
        <>
            <div className="grid grid-cols-2 md:text-lg text-xs font-semibold mt-5">
                <h2 className="text-center md:ml-5">Select Delivery Station</h2>
                <h2 className="text-center md:mr-5">{stations?.length} Stations Available</h2>
            </div>

            <div className="flex flex-col md:mt-10 mt-3">
                {stations?.map(station => (
                    <div className="m-1 md:m-2 md:w-1/2 w-11/12 content-center self-center md:rounded rounded-md md:p-5 p-4 md:h-28
                   shadow-lg bg-white cursor-pointer flex justify-between" key={station.code} onClick={() => handleOnClick(station)}>
                        <div className="self-center text-start md:text-xl text-sm" key={station.code}>
                            <p className="font-bold">{station.name}  <span className="font-light text-xs md:text-base">{station.code}</span></p>
                            <div className="md:flex md:pt-2 pt-1 md:text-base text-xs">
                                <p>{(JSON.parse(station.delayArrival) === 0 || station.delayArrival === null) ? "On time" : "Late by " + station.delayArrival + " mins"},</p>
                                <p>{station.halt === "--" ? " Starting station" : " " + " " + station.halt + " mins halt"}</p>
                            </div>
                        </div>
                        <div className="self-center text-center md:pr-10 flex gap-2">
                            <div>
                            <p className={`font-bold md:text-xl text-sm ${JSON.parse(station.delayArrival) > 0 ? "text-red-500" : "text-green-600"  }`}>{station.departure}</p>
                            <p className="pt-4 md:text-lg font-bold text-sm">{station.depDate}</p>
                            </div>
                            <div className="self-center text-center text-sky-300">
                            <FaChevronRight />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <br />
        </>
    )
}

export default memo(StationData);