import React from "react";

export default function DeliveryInfo({ userInfo, trainInfo, stationInfo, seatInfo }) {

    return (
        <>
            <div className=" w-1/3 rounded-xl shadow-md bg-rose-200 h-fit">
                <p className="font-medium text-2xl text-center bg-rose-300 p-4 rounded-md">Deliver to </p><br />
                {userInfo && <ol className="p-4 bg-white m-2 rounded-md">
                    <li className="font-semibold text-lg">Passanger Details</li>
                    <li>Name : {userInfo.fullName}</li>
                    <li>Mobile Number : {userInfo.mobileNumber}</li>
                    <li>Email : {userInfo.emailId}</li>
                </ol>}<br />
                <ol className="p-4 bg-white m-2 rounded-md">
                    {trainInfo && <ul>
                        <li className="font-semibold text-lg">Journey Details</li>
                        <li>Train : {trainInfo.trainNo} - {trainInfo.name}</li>
                        <li>From : {trainInfo.boarding} to {trainInfo.destination} on {trainInfo.dt}</li>
                    </ul>}<br />
                    {stationInfo && <ul>
                        <li className="font-semibold text-lg">Delivery Details</li>
                        <li className="">Station : {stationInfo.name} {stationInfo.code}</li>
                        <li>Time : {stationInfo.depDate} {stationInfo.departure}</li>
                        <li>Coach : {seatInfo.coach}</li>
                        <li>Berth : {seatInfo.berth}</li>
                    </ul>}
                </ol>
            </div>
        </>
    )
}