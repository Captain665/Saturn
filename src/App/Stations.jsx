import React from "react";
import { useLocation, useNavigate } from "react-router";

export default function StationList() {
    const { state } = useLocation();
    const { data } = state
    const stationList = data.stations;
    const trainInfo = data.trainInfo;
    const navigate = useNavigate()

    function handleOnClick(item){
        navigate("/outlet/station/"+item.code, {state:{item}})
        console.log("redirected")
    }


    const trainDetails = (
        <div className="shadow-md p-6 rounded-lg w-full">
            <ul className="item-center grid grid-cols-2 text-xl gap-3">
                <li className="font-bold">{trainInfo.name} <span className="font-thin">({trainInfo.trainNo})</span></li>
                <li className="inline-flex flex-row-reverse">On {trainInfo.dt}</li>
                <li className="font-thin">{trainInfo.boarding} onwords</li>
            </ul>
        </div>
    )
    const stationDetails = stationList.map((item) => (
        <>
            <div className="m-2 w-11/12 content-center shadow-lg rounded-lg p-5 grid
             grid-cols-2 gap-6 border-2 border-[#ff7e8b] text-[#ff7e8b] hover:bg-[#ff7e8b] hover:text-white cursor-pointer" onClick={() => handleOnClick(item)}>
                <div className="self-center text-start">
                    <p className="font-bold">{item.name}  <span className="font-light">{item.code}</span></p>
                    <p className="text-sm">{(item.delayArrival === 0 || item.delayArrival === null) ? "On time " : "Late by " + item.delayArrival + " mins"},
                        <span>{item.halt === "--" ? " Starting station" : " " + item.halt + " mins halt"}</span></p>
                </div>
                <div className="self-center text-center">
                    <p className="text-green-600 font-bold text-xl">{item.departure}</p>
                    <p>{item.depDate}</p>
                </div>
            </div>
        </>
    ))


    return (
        < div className="flex flex-col justify-center self-center items-center w-4/6 shadow-md"><br />
            <h1 className="text-2xl font-bold">Journey Details & Station List</h1>
            {trainDetails}
            <br />
            <div className="grid grid-cols-2 w-full text-lg font-semibold">
                <h2 className="text-center ml-5">Choose Delivery Station</h2>
                <h2 className="text-center mr-5">Showing {stationList.length} stations</h2>
            </div><br />
            <div className="grid grid-cols-2 w-11/12">
                {stationDetails}
            </div>
            <br />
        </div>
    )
}