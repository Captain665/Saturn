import React, { useState } from "react";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FormatedDateWithTime } from "../../Components/DateTimeFormatChange";
import { memo } from "react";
import { orderDetails } from "../../CommonTypes/CommonType";


function OrderInfo({ order, backToHome }: { order: orderDetails; backToHome: any }) {

    const [detailShown, setIsDetailShown] = useState<{ customer: boolean; delivery: boolean; restaurant: boolean }>({
        customer: true,
        delivery: true,
        restaurant: true
    })


    const totalPrice = (a: number, b: number): number => {
        const totalValue: number = a * b;
        return JSON.parse(totalValue.toFixed(2))
    }

    const customer = (): void => {
        setIsDetailShown(prevData => ({
            ...prevData,
            customer: !prevData.customer
        }))
    }

    const delivery = (): void => {
        setIsDetailShown(prevData => ({
            ...prevData,
            delivery: !prevData.delivery
        }))
    }

    const restaurant = (): void => {
        setIsDetailShown(prevData => ({
            ...prevData,
            restaurant: !prevData.restaurant
        }))
    }

    const orderStatus = (orderStatus: string): string => {
        if (orderStatus === "CANCELLED" || orderStatus === "UNDELIVERED" || orderStatus === "PARTIALLY_DELIVERED") {
            return "red"
        } else {
            return "green"
        }
    }

    return (
        <>
            <ul className="md:w-3/4 m-auto mt-5 w-full">

                <ul>
                    <li className="flex items-center gap-2 opacity-70 cursor-pointer w-fit ml-2 md:ml-0" onClick={backToHome}>
                        <FaArrowLeft /> Back
                    </li>
                    <li className="mt-4 font-extrabold text-2xl ml-2 md:ml-0">Order Details</li>
                </ul>

                <ul className="flex md:flex-row flex-col gap-2 m-2">
                    <ul className="md:flex md:flex-row grid grid-cols-3 md:w-4/6 w-full justify-between p-2 bg-white md:border rounded-md gap-2">
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
                            <ul className="flex flex-col md:flex-row gap-1">
                                <li>{order?.payments?.paymentType}</li>
                                <ul className={`gap-1 bg-green-100 items-center rounded-2xl px-1 w-fit ${order?.payments?.paymentType === "CASH" ? "hidden" : "flex"}`}>
                                    <li className="bg-green-600 text-white rounded-full w-5 h-fit text-center text-sm">&#x2713;</li>
                                    <li className="text-green-600">Paid</li>
                                </ul>
                            </ul>
                        </ul>
                        <ul>
                            <li className="opacity-50 font-extrabold">Status</li>
                            <li className={`${orderStatus(order?.status) === "green" ? "bg-green-600" : "bg-red-600"} font-extrabold px-1 rounded text-white w-fit`}>{order?.status}</li>
                        </ul>
                    </ul>
                    <ul className="w-2/6 p-2 bg-white rounded-md border md:flex hidden justify-center items-center">
                        <li className="font-bold text-lg">Order Summary</li>
                    </ul>
                </ul>

                <ul className="flex md:flex-row flex-col gap-2 mt-5">
                    <ul className="md:w-4/6 w-full p-2 bg-white">
                        <ul className="flex justify-between px-1 border-b-2 border-b-black border-opacity-60 md:text-base text-xs" >
                            <ul className="md:w-4/6 w-3/5">
                                <li className="opacity-50 font-extrabold">Ordered Items</li>
                            </ul>
                            <ul className="md:w-2/6 w-2/5 flex justify-between opacity-50 font-extrabold gap-3">
                                <li>Price</li>
                                <li>Quantity</li>
                                <li>Total Price</li>
                            </ul>
                        </ul>
                        <div className="">
                            {order && order?.orderItems?.map((itemData) => (
                                <ul className="flex justify-between border md:p-5 p-3 mt-2 items-center" key={itemData.id}>
                                    <ul className="md:w-4/6 mt-2 w-3/5">
                                        <img src={itemData.veg ? "/veg.png" : "/nonveg.png"} alt="item logo" className="md:w-3 w-2" />
                                        <li className="md:text-lg">{itemData.itemName}</li>
                                        <li className="text-xs opacity-80 line-clamp-1 px-2 pr-10">{itemData.description}</li>
                                    </ul>
                                    <ul className="md:w-2/6 w-2/5 flex justify-between md:text-base text-xs">
                                        <li>&#x20B9;{itemData.basePrice}</li>
                                        <li>{itemData.quantity}</li>
                                        <li>&#x20B9;{totalPrice(itemData?.basePrice, itemData?.quantity)}</li>
                                    </ul>
                                </ul>
                            ))}
                        </div><br />

                        <ul className="">
                            <li className="border-b-2 border-b-gray-400 border-dashed opacity-80 pl-2">#BILL DETAILS</li>
                            <ul className="flex justify-end gap-10 mt-5">
                                <ul className="flex flex-col gap-2 opacity-90">
                                    <li className="font-bold">Item Total : </li>
                                    <li>Taxes : </li>
                                    <li>Delivery Charges : </li>
                                    <li className="opacity-100 text-lg font-extrabold">Paid : </li>
                                </ul>
                                <ul className="flex flex-col gap-2 opacity-90">
                                    <li>&#x20B9;{order?.payments?.totalAmount}</li>
                                    <li>&#x20B9;{order?.payments?.gst}</li>
                                    <li>&#x20B9;{order?.payments?.deliveryCharge}</li>
                                    <li className="opacity-100 text-lg font-extrabold">&#x20B9;{order?.payments?.payable_amount}</li>
                                </ul>

                            </ul>

                            <ul className={`${order?.payments?.paymentType === "CASH" ? "hidden" : "flex"} gap-1 bg-green-100 w-fit px-2 rounded-xl float-right mt-2 mr-5 items-center`}>
                                <li className="bg-green-600 text-white rounded-full w-5 h-fit text-center text-sm">&#x2713;</li>
                                <li className="text-green-600">Paid</li>
                            </ul>
                        </ul>
                    </ul>

                    <ul className="md:w-2/6 w-full p-2 bg-white flex md:border flex-col h-fit mt-10">
                        <ul>
                            <ul className="flex items-center justify-between px-2 border-b-2 cursor-pointer" onClick={customer}>
                                <li className="font-bold md:text-lg">User</li>
                                <li>{detailShown.customer ? <FaChevronUp /> : <FaChevronDown />}</li>
                            </ul>
                            <ul className={`${detailShown.customer ? "flex" : "hidden"} justify-start p-5 gap-5 md:text-base text-sm`}>
                                <ul className=" opacity-70">
                                    <li>Name : </li>
                                    <li> Mobile : </li>
                                    <li>Email : </li>
                                </ul>
                                <ul className="">
                                    <li>{order?.customer?.fullName}</li>
                                    <li>{order?.customer?.mobileNumber}</li>
                                    <li>{order?.customer?.emailId}</li>
                                </ul>
                            </ul>
                        </ul>
                        <ul>
                            <ul className="flex items-center justify-between px-2 mt-5 border-b-2 cursor-pointer" onClick={delivery}>
                                <li className="font-bold md:text-lg">Delivery details</li>
                                <li>{detailShown.delivery ? <FaChevronUp /> : <FaChevronDown />} </li>
                            </ul>
                            <ul className={`${detailShown.delivery ? "flex" : "hidden"} justify-start p-5 gap-5 md:text-base text-sm`}>
                                <ul className=" opacity-70">
                                    <li>Station :</li>
                                    <li>Date :</li>
                                    <li>Coach :</li>
                                    <li>Berth :</li>
                                </ul>
                                <ul className="">
                                    <li>{order?.delivery?.stationName},{order?.delivery?.stationCode}</li>
                                    <li>{FormatedDateWithTime(order?.delivery?.deliveryDate)}</li>
                                    <li>{order?.delivery?.coach}</li>
                                    <li>{order?.delivery?.berth}</li>
                                </ul>
                            </ul>
                        </ul>
                        <ul>
                            <ul className="flex items-center justify-between px-2 mt-5 border-b-2 cursor-pointer" onClick={restaurant}>
                                <li className="font-bold md:text-lg">Restaurant details</li>
                                <li>{detailShown.restaurant ? <FaChevronUp /> : <FaChevronDown />}</li>
                            </ul>
                            <ul className={`${detailShown.restaurant ? "flex" : "hidden"} justify-start p-5 gap-5 md:text-base text-sm`}>
                                <ul className=" opacity-70">
                                    <li>Name :</li>
                                    <li>Location :</li>
                                    <li>Mobile :</li>
                                    <li>fssai:</li>
                                </ul>
                                <ul className="">
                                    <li>{order?.outlet?.outletName}</li>
                                    <li>{order?.outlet?.city}</li>
                                    <li>{order?.outlet?.mobileNo}</li>
                                    <li>{order?.outlet?.fssaiNo}</li>
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

export default memo(OrderInfo);