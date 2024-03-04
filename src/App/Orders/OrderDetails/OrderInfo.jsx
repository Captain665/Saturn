import React, { useState } from "react";
import IsLoading from "../../../App/Components/Loading";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FormatedDateWithTime } from "../../Components/DateTimeFormatChange";


export default function OrderInfo({ order, isLoading, backToHome }) {

    const [detailShown, setIsDetailShown] = useState({
        customer: true,
        delivery: true,
        restaurant: true
    })

    if (isLoading) {
        return <IsLoading />
    }

    const totalPrice = (a, b) => {
        const totalValue = a * b;
        return JSON.parse(totalValue.toFixed(2))
    }

    const customer = () => {
        setIsDetailShown(prevData => ({
            ...prevData,
            customer: !prevData.customer
        }))
    }

    const delivery = () => {
        setIsDetailShown(prevData => ({
            ...prevData,
            delivery: !prevData.delivery
        }))
    }

    const restaurant = () => {
        setIsDetailShown(prevData => ({
            ...prevData,
            restaurant: !prevData.restaurant
        }))
    }



    return (
        <>
            <ul className="w-3/4 m-auto mt-5">

                <ul>
                    <li className="flex items-center gap-2 opacity-70 cursor-pointer w-fit" onClick={backToHome}>
                        <FaArrowLeft /> Back to Home
                    </li>
                    <li className="mt-10 font-extrabold text-2xl">Order Details</li>
                </ul>

                <ul className="flex gap-2">
                    <ul className="flex w-4/6 justify-between p-2 bg-white border rounded-md">
                        <ul>
                            <li className="opacity-50 font-extrabold">Order ID</li>
                            <li className="font-bold">#{order?.id}</li>
                        </ul>
                        <ul>
                            <li className="opacity-50 font-extrabold">Date</li>
                            <li>{FormatedDateWithTime(order?.bookingDate)}</li>
                        </ul>
                        <ul>
                            <li className="opacity-50 font-extrabold">Payment</li>
                            <ul className="flex gap-1">
                                <li>{order?.paymentType}</li>
                                <ul className="flex gap-1 bg-green-100 items-center rounded-2xl px-1">
                                    <li className="bg-green-600 text-white rounded-full w-5 h-fit text-center text-sm">&#x2713;</li>
                                    <li className="text-green-600">Paid</li>
                                </ul>
                            </ul>
                        </ul>
                        <ul>
                            <li className="opacity-50 font-extrabold">Status</li>
                            <li>{order?.status}</li>
                        </ul>
                    </ul>
                    <ul className="w-2/6 p-2 bg-white rounded-md border flex justify-center items-center">
                        <li className="font-bold text-lg">Order Summary</li>
                    </ul>
                </ul>

                <ul className="flex gap-2 mt-5">
                    <ul className="w-4/6 p-2 bg-white">
                        <ul className="flex justify-between px-1 border-b-2 border-b-black">
                            <ul className="w-4/6">
                                <li className="opacity-50 font-extrabold">Ordered Items</li>
                            </ul>
                            <ul className="w-2/6 flex justify-between opacity-50 font-extrabold ">
                                <li cl>Price</li>
                                <li>Quantity</li>
                                <li>Total Price</li>
                            </ul>
                        </ul>
                        <div className="">
                            {order && order?.orderItems?.map((itemData) => (
                                <ul className="flex justify-between border p-5 mt-2 items-center" key={itemData.id}>
                                    <ul className="w-4/6 mt-2">
                                        <img src={itemData.veg ? "/veg.png" : "/nonveg.png"} alt="item logo" className="w-4" />
                                        <li className="text-lg">{itemData.itemName}</li>
                                        <li className="text-xs opacity-80 line-clamp-1 px-2 pr-10">{itemData.description}</li>
                                    </ul>
                                    <ul className="w-2/6 flex justify-between">
                                        <li>&#x20B9;{itemData.basePrice}</li>
                                        <li>{itemData.quantity}</li>
                                        <li>&#x20B9;{totalPrice(itemData?.basePrice, itemData?.quantity)}</li>
                                    </ul>
                                </ul>
                            ))}
                        </div><br />

                        <ul className="">
                            <li className="border-b-black border-b-2 opacity-70 pl-2">#BILL DETAILS</li>
                            <ul className="flex justify-end gap-10 mt-5">
                                <ul className="flex flex-col gap-2 opacity-90">
                                    <li className="font-bold">Item Total : </li>
                                    <li>Taxes : </li>
                                    <li>Delivery Charges : </li>
                                    <li className="opacity-100 text-lg font-extrabold">Paid : </li>
                                </ul>
                                <ul className="flex flex-col gap-2 opacity-90">
                                    <li>&#x20B9;{order?.totalAmount}</li>
                                    <li>&#x20B9;{order?.gst}</li>
                                    <li>&#x20B9;{order?.deliveryCharge}</li>
                                    <li className="opacity-100 text-lg font-extrabold">&#x20B9;{order?.payable_amount}</li>
                                </ul>

                            </ul>

                            <ul className="flex gap-1 bg-green-100 w-fit px-2 rounded-xl float-right mt-2 mr-5 items-center">
                                <li className="bg-green-600 text-white rounded-full w-5 h-fit text-center text-sm">&#x2713;</li>
                                <li className="text-green-600">Paid</li>
                            </ul>
                        </ul>
                    </ul>

                    <ul className="w-2/6 p-2 bg-white flex border flex-col h-fit mt-10">
                        <ul>
                            <ul className="flex items-center justify-between px-2 border-b-2 cursor-pointer" onClick={customer}>
                                <li className="font-bold text-lg">User</li>
                                <li>{detailShown.customer ? <FaChevronUp /> : <FaChevronDown />}</li>
                            </ul>
                            <ul className={`${detailShown.customer ? "flex" : "hidden"} justify-start p-5 gap-5`}>
                                <ul className=" opacity-70">
                                    <li>Name : </li>
                                    <li> Mobile : </li>
                                    <li>Email : </li>
                                </ul>
                                <ul className="">
                                    <li>{order?.customerDetail?.fullName}</li>
                                    <li>{order?.customerDetail?.mobileNumber}</li>
                                    <li>{order?.customerDetail?.emailId}</li>
                                </ul>
                            </ul>
                        </ul>
                        <ul>
                            <ul className="flex items-center justify-between px-2 mt-5 border-b-2 cursor-pointer" onClick={delivery}>
                                <li className="font-bold text-lg">Delivery details</li>
                                <li>{detailShown.delivery ? <FaChevronUp /> : <FaChevronDown />} </li>
                            </ul>
                            <ul className={`${detailShown.delivery ? "flex" : "hidden"} justify-start p-5 gap-5`}>
                                <ul className=" opacity-70">
                                    <li>Station :</li>
                                    <li>Date :</li>
                                    <li>Coach :</li>
                                    <li>Berth :</li>
                                </ul>
                                <ul className="">
                                    <li>{order?.stationName},{order?.stationCode}</li>
                                    <li>{order?.deliveryDate}</li>
                                    <li>{order?.coach}</li>
                                    <li>{order?.berth}</li>
                                </ul>
                            </ul>
                        </ul>
                        <ul>
                            <ul className="flex items-center justify-between px-2 mt-5 border-b-2 cursor-pointer" onClick={restaurant}>
                                <li className="font-bold text-lg">Restaurant details</li>
                                <li>{detailShown.restaurant ? <FaChevronUp /> : <FaChevronDown />}</li>
                            </ul>
                            <ul className={`${detailShown.restaurant ? "flex" : "hidden"} justify-start p-5 gap-5`}>
                                <ul className=" opacity-70">
                                    <li>Name :</li>
                                    <li>Location :</li>
                                    <li>Mobile :</li>
                                    <li>fssai:</li>
                                </ul>
                                <ul className="">
                                    <li>{order?.outlets?.outletName}</li>
                                    <li>{order?.outlets?.city}</li>
                                    <li>{order?.outlets?.mobileNo}</li>
                                    <li>{order?.outlets?.fssaiNo}</li>
                                </ul>
                            </ul>
                        </ul>
                    </ul>

                </ul>

            </ul>
            <br />
            <br />
        </>
    )
}