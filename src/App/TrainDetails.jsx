import React, { useState } from "react";
import { Outlet, useLocation } from "react-router";

export default function TrainDetail() {
    const { state } = useLocation();
    const { data } = state
    const [train] = useState(data);


    return (
        <>
        <h1 className="text-xl font-bold text-center pt-3">Journey Details & Station List</h1>
             <div className="flex flex-col justify-center self-center items-center w-11/12 shadow rounded-md"><br />
                
                <div className="p-1 rounded-lg w-full px-28">
                    <ul className="item-center grid grid-cols-2 text-sm gap-3">
                        <li className="font-bold">{train.trainInfo.name} <span className="font-thin">({train.trainInfo.trainNo})</span></li>
                        <li className="inline-flex flex-row-reverse">On {train.trainInfo.dt}</li>
                        <li className="font-thin">{train.trainInfo.boarding} onwords</li>
                    </ul>
                </div>
            </div><br />
            <Outlet context={[train]}/>
            <br />
            </>
    )
}