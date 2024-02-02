import React, { memo } from "react";



function StationData({ stations, handleOnClick }) {

    return (
        <>
            <div className="grid grid-cols-2 md:text-lg text-xs font-semibold mt-5">
                <h2 className="text-center md:ml-5">Select Delivery Station</h2>
                <h2 className="text-center md:mr-5">{stations?.length} Stations Available</h2>
            </div>

            <div className="flex flex-col md:mt-10">
                {stations?.map(station => (
                    <div className="m-1 md:m-2 md:w-1/2 w-11/12 content-center self-center md:rounded-lg rounded-md md:p-5 p-2 md:h-28
                  border-2 cursor-pointer hover:border-4 flex justify-between" key={station.code} onClick={() => handleOnClick(station)}>
                        <div className="self-center text-start md:text-xl text-sm" key={station.code}>
                            <p className="font-bold">{station.name}  <span className="font-light text-xs md:text-base">{station.code}</span></p>
                            <div className="md:flex md:pt-2 pt-1 md:text-base text-sm">
                                <p>{(JSON.parse(station.delayArrival) === 0 || station.delayArrival === null) ? "On time" : "Late by " + station.delayArrival + " mins"},</p>
                                <p>{station.halt === "--" ? " Starting station" : " " + station.halt + " mins halt"}</p>
                            </div>
                        </div>
                        <div className="self-center text-center md:pr-10">
                            <p className={`font-bold md:text-xl ${JSON.parse(station.delayArrival) > 0 ? "text-red-500" : "text-green-600"  }`}>{station.departure}</p>
                            <p className="pt-4 md:text-lg font-bold">{station.depDate}</p>
                        </div>
                    </div>
                ))}
            </div>
            <br />
        </>
    )
}

export default memo(StationData);