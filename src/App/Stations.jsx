import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

export default function StationList() {

    const [train] = useOutletContext()
    const [jourenyData] = useState(train)
    const navigate = useNavigate();
    const [stations] = useState(train.stations)
    const [stationLength] = useState(stations.length)


    function handleOnClick(station) {
        window.sessionStorage.setItem("selectedStation",JSON.stringify(station))
        navigate(station.code, {state:{ jourenyData,station }})
    }



    const stationDetails = stations.map((station) => (
        <>
            <div className="m-2 w-2/3 content-center self-center shadow-lg rounded-lg p-5 grid h-40
             grid-cols-2 gap-6 border-2 border-[#ff7e8b] text-[#ff7e8b] hover:bg-[#ff7e8b] hover:text-white cursor-pointer" key={station.code} onClick={() => handleOnClick(station)}>
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
        </>
    ))

    return (
        <>
            <div className="grid grid-cols-2 text-lg font-semibold">
                <h2 className="text-center ml-5">Choose Delivery Station</h2>
                <h2 className="text-center mr-5">Showing {stationLength} stations</h2>
            </div><br />
                {stationDetails}
            <br />
        </>
    )
}