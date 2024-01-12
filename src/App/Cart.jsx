import React from "react";

export default function CartDetails() {

    const outlet = window.sessionStorage.getItem("outletInfo")
    const outletInfo = JSON.parse(outlet)
    const station = window.sessionStorage.getItem("selectedStation")
    const stationInfo = JSON.parse(station)
    const items = window.sessionStorage.getItem("selectedItemInfo")
    const itemInfo = JSON.parse(items)
    const user = window.localStorage.getItem("userInfo")
    const userInfo = JSON.parse(user)
    const pnrDetails = window.sessionStorage.getItem("pnrDetails")
    const trainInfo = JSON.parse(pnrDetails).trainInfo;
    const seatInfo = JSON.parse(pnrDetails).seatInfo;



    const deliveryDetails = (
        <div className=" w-1/3 rounded-xl shadow-md bg-gray-200 h-fit">
            <p className="font-semibold text-2xl text-center bg-gray-300 p-2 rounded-md">Deliver to </p><br />
            <ol className="p-4 bg-gray-300 m-2 rounded-md">
                <li className="font-semibold text-lg">Passanger Details</li>
                <li>Name : {userInfo.fullName}</li>
                <li>Mobile Number : {userInfo.mobileNumber}</li>
                <li>Email : {userInfo.emailId}</li>
            </ol><br />
            <ol className="p-4 bg-gray-300 m-2 rounded-md">
                <ul>
                    <li className="font-semibold text-lg">Journey Details</li>
                    <li>Train : {trainInfo.trainNo} - {trainInfo.name}</li>
                    <li>From : {trainInfo.boarding} to {trainInfo.destination} on {trainInfo.dt}</li>
                </ul><br />
                <ul>
                    <li className="font-semibold text-lg">Delivery Details</li>
                    <li className="">Station : {stationInfo.name} {stationInfo.code}</li>
                    <li>Time : {stationInfo.depDate} {stationInfo.departure}</li>
                    <li>Coach : {seatInfo.coach}</li>
                    <li>Berth : {seatInfo.berth}</li>
                </ul>
            </ol>
        </div>
    )

    const itemDetails = (
        <div className="w-2/3 bg-gray-200 rounded-xl shadow-md flex flex-col self-center">
            <p className="text-center font-medium text-2xl p-4 shadow-lg bg-gray-300 rounded-md">Cart Summary</p>
            <ul className="bg-gray-300 p-2 gap-10 h-16 flex w-11/12 self-center m-2 rounded-md">
                <img src={outletInfo.logoImage} alt="outlet logo" className="object-cover" width={80} />
                <li className="font-bold text-2xl">{outletInfo.outletName}</li>
            </ul>
            {itemInfo && itemInfo.map(item => (
                <ul className="p-4 bg-gray-300 w-11/12 self-center content-center shadow-md m-2 rounded-lg">
                    <img src={item.isVegeterian ? "/veg.png" : "nonveg.png"} alt="item logo" className="w-4" />
                    <li>{item.name}</li>
                    <li>{item.description}</li> 
                    <li>{item.basePrice}</li>
                    <li>{item.quantity}</li>
                </ul>
            ))}
            <br />
        </div>
    )
    const paymentDetails = (

        <div>
            <p>Subtotal </p>
            <p>taxes</p>
            <p>delivery Charges</p>
            <p>Total Payable</p>
        </div>

    )


    return (
        <>
            <div className="bg-slate-100 cursor-pointer flex justify-between p-2">
                <p><span className="font-bold text-2xl w-1/2">&#x2190;</span> Menu Items</p>
                <p className="font-medium text-4xl w-1/2 text-start">Your Cart</p>
            </div>
            <div className="w-11/12 self-center m-6 flex gap-5">
                {deliveryDetails}
                {itemDetails}
            </div>
            <div className="w-11/12 self-center pt-6">
                {paymentDetails}
            </div>
            <div>
                <button type="submit" className="p-2 border-none rounded-lg bg-slate-600 float-right m-5">Place Order</button>
            </div><br />
        </>
    )
}