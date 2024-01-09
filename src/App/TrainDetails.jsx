import React, { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { FaTrain } from "react-icons/fa6";

export default function TrainDetail() {
    const { state } = useLocation();
    const { data } = state
    const [train] = useState(data);


    return (
        <>
        <h1 className="text-4xl font-bold text-center pt-3">Journey Details & Station List</h1>
             <div className="flex flex-col justify-center self-center items-center w-11/12 shadow rounded-md"><br />
                
                <div className="p-4 rounded-lg w-full px-28">
                    <ul className="item-center grid grid-cols-2 gap-3">
                        <li className="inline-flex text-xl"><span><FaTrain /></span><span className="font-bold text-2xl pl-4">{train.trainInfo.name}</span> <span className="font-thin">({train.trainInfo.trainNo})</span></li>
                        <li className="inline-flex flex-row-reverse text-xl">On {train.trainInfo.dt}</li>
                        <li className="font-thin text-lg pl-14">{train.trainInfo.boarding} onwords</li>
                    </ul>
                </div>
            </div><br />
            <Outlet context={[train]}/>
            <br />
            </>
    )
}