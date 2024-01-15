import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { FaTrain } from "react-icons/fa6";

export default function TrainDetail() {
    const result = JSON.parse(window.sessionStorage.getItem("pnrDetails"))
    var pnrRes = []
    if(result !== null){
        pnrRes = result
    }
    const [train, setTrainData] = useState(pnrRes);
    let { pnr } = useParams()


    useEffect(() => {
        const fetchData = async () => {
            const requestBody = {
                method: 'GET'
            }
            const response = await fetch("/pnr/" + pnr, requestBody);
            const jsonData = await response.json()
            setTrainData(jsonData.result)
        }
        return () => { fetchData() }
    }, [pnr])

    useEffect(() => {
        window.sessionStorage.setItem("pnrDetails",JSON.stringify(train))
    },[train])


    return (
        <>{train ? <>
            <h1 className="text-4xl font-bold text-center pt-3">Journey Details & Station List</h1>
            <div className="flex flex-col justify-center self-center items-center w-11/12 shadow rounded-md bg-green-200"><br />

                <div className="p-4 rounded-lg w-full px-28  place-items-center">
                    <ul className="item-center grid grid-cols-2 gap-3">
                        <li className="inline-flex text-xl gap-2"><span><FaTrain /></span><span className="font-bold text-2xl pl-4">{train.trainInfo.trainNo}</span> - <span className="font-thin">{train.trainInfo.name}</span></li>
                        <li className="inline-flex flex-row-reverse text-xl">On {train.trainInfo.dt}</li>
                        <li className="font-thin text-lg pl-14">{train.trainInfo.boarding} onwords</li>
                    </ul>
                </div>
            </div><br />
            <Outlet context={[train]} />
            <br />
        </>
            : <h1 className="h-screen flex justify-center items-center text-4xl">Loading...</h1>}
        </>
    )
}