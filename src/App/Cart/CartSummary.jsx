import React, { useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FormatedDateWithYear, FormatedTime } from "../Components/DateTimeFormatChange";
import { cartInfoContext } from "./Cart";

export default function CartSummary() {
    
    const summeryDetails = useContext(cartInfoContext);
    const itemList = summeryDetails.itemList;
    const makePayment = summeryDetails.makePayment;
    const outletInfo = summeryDetails.outletInfo;
    const userInfo = summeryDetails.userInfo;
    const stationInfo = summeryDetails.stationInfo;
    const trainInfo = summeryDetails.trainInfo;
    const seatInfo = summeryDetails.seatInfo;
    const customerDetailsShown = summeryDetails.customerDetailsShown;
    const detailsShown = summeryDetails.detailsShown;
    const deliveryDetailsShown = summeryDetails.deliveryDetailsShown;
    const billDetail = summeryDetails.billDetail;

    const subTotal = JSON.parse(itemList?.reduce((a, b) => a + (b.basePrice * b.quantity), 0).toFixed(2))
    const taxes = JSON.parse((subTotal * 0.05).toFixed(2))
    const deliveryCharge = outletInfo?.deliveryCost;
    const payable = Math.round(subTotal + taxes + deliveryCharge)


    return (
        <div className="md:w-1/3 md:mt-7 m-0.5 w-11/12 items-center self-center md:self-start">

            <ul className="bg-gray-50 p-4 border-2 rounded">
                <li>Enter Promo Code</li>
                <div className="flex items-center gap-3 mt-2">
                    <input type="text" className="border h-8 outline-none pl-2 rounded w-2/3" placeholder="Promo Code" />
                    <button className="bg-black text-white h-8 px-8 rounded">Submit</button>
                </div>
            </ul>
            <br />

            <ul className="flex justify-between p-3 border-t-2" id="bill">
                <ul className="flex flex-col gap-2">
                    <li className=" text-lg">Item Total :</li>
                    <li>Taxes :</li>
                    <li>Delivery Charge :</li>
                    <li className="text-xl font-semibold">Grand Total : </li>
                </ul>
                <ul className="flex flex-col gap-2">
                    <li className=" text-lg">&#x20B9;{subTotal}</li>
                    <li>&#x20B9;{taxes}</li>
                    <li>&#x20B9;{deliveryCharge}</li>
                    <li className="text-xl font-semibold">&#x20B9;{payable}</li>
                </ul>
            </ul>
            <br />

            <button className="text-center bg-[#60b246] w-full h-10 text-white font-extrabold text-xl"
                onClick={makePayment}>
                MAKE PAYMENT
            </button>

            <ul className="flex items-center justify-between cursor-pointer mt-10" onClick={customerDetailsShown}>
                <li className="font-bold text-lg">Customer Details</li>
                <li className="text-gray-500">{detailsShown.customer ? <FaChevronUp /> : <FaChevronDown />}</li>
            </ul>
            <ul className={`${detailsShown.customer ? "block" : "hidden"} m-2 bg-white p-2`}>
                {userInfo && <ul className="bg-white rounded-md">
                    <li className="font-semibold text-lg">Passanger Details</li>
                    <li>Name : {userInfo.fullName}</li>
                    <li>Mobile Number : {userInfo.mobileNumber}</li>
                    <li>Email : {userInfo.emailId}</li>
                </ul>}
            </ul>

            <ul className="flex items-center justify-between mt-5 cursor-pointer" onClick={deliveryDetailsShown}>
                <li className="font-bold text-lg">Delivery Details</li>
                <li className="text-gray-500">{detailsShown.delivery ? <FaChevronUp /> : <FaChevronDown />}</li>
            </ul>
            <ul className={`${detailsShown.delivery ? "block" : "hidden"} m-2 bg-white p-2`}>
                {trainInfo && <ul>
                    <li className="font-semibold text-lg">Journey Details</li>
                    <li>Train : {trainInfo.trainNo} - {trainInfo.name}</li>
                    <li>From : {trainInfo.boarding} to {trainInfo.destination} on {FormatedDateWithYear(trainInfo.dt)}</li>
                </ul>}<br />
                {stationInfo && <ul>
                    <li className="font-semibold text-lg">Delivery Details</li>
                    <li className="">Station : {stationInfo.name} {stationInfo.code}</li>
                    <li>Time :  {FormatedTime(stationInfo.departure)} | {FormatedDateWithYear(stationInfo.depDate)} </li>
                    <li>Coach : {seatInfo.coach}</li>
                    <li>Berth : {seatInfo.berth}</li>
                </ul>}
            </ul>
            <br />


            <ul className="flex justify-center font-extrabold md:hidden">
                <ul className="flex fixed bottom-0 w-full md:w-1/2 z-50 justify-between bg-white">
                    <ul className="p-1 w-1/2 px-3">
                        <li className="text-lg">&#x20B9;{payable}</li>
                        <a href="#bill" className="text-blue-500 text-sm font-extralight" onClick={(event) => billDetail(event)}>VIEW DETAILED BILL</a>
                    </ul>
                    <ul className="flex items-center cursor-pointer bg-[#60b646] text-white p-1 md:p-4 px-5 w-1/2 text-center"
                        onClick={makePayment}>
                        <li>MAKE PAYMENT</li>
                    </ul>
                </ul>
            </ul >

        </div>
    )
}