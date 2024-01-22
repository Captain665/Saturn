import React, { memo } from "react";



function StationData({ stations, handleOnClick }) {

    return (
        <>
            <div className="grid grid-cols-2 text-lg font-semibold">
                <h2 className="text-center ml-5">Select Delivery Station</h2>
                <h2 className="text-center mr-5">{stations?.length} Stations Available</h2>
            </div><br />
            {stations?.map(station => (
                <div className="m-2 w-1/2 content-center self-center shadow-lg rounded-lg p-5 grid h-28
             grid-cols-2 gap-6 border-2 cursor-pointer hover:border-4" key={station.code} onClick={() => handleOnClick(station)}>
                    <div className="self-center text-start text-xl" key={station.code}>
                        <p className="font-bold">{station.name}  <span className="font-light">{station.code}</span></p>
                        <p className="text-sm pt-4">{(station.delayArrival === 0 || station.delayArrival === null) ? "On time " : "Late by " + station.delayArrival + " mins"},
                            <span>{station.halt === "--" ? " Starting station" : " " + station.halt + " mins halt"}</span></p>
                    </div>
                    <div className="self-center text-center">
                        <p className="text-green-600 font-bold text-xl">{station.departure}</p>
                        <p className="pt-4 text-lg font-bold">{station.depDate}</p>
                    </div>
                </div>
            ))}
            <br />
        </>
    )
}

export default memo(StationData);