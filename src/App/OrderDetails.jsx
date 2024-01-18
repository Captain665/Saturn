import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaUser, FaCartShopping, FaMoneyCheckDollar, FaMoneyBill, FaSpinner } from "react-icons/fa6";

export default function OrderDetail() {
    const { orderId } = useParams()
    const token = JSON.parse(localStorage.getItem("userInfo")).jwt;

    const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState()


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const requestBody = {
                method: "GET",
                headers: {
                    Authorization: token
                }
            }
            const url = "/order/" + orderId
            const response = await fetch(url, requestBody)
            const jsonData = await response.json();
            if (response.ok) {
                setOrder(jsonData.result)
            }
            setIsLoading(false)
        }
        return () => { fetchData() }
    }, [orderId, token])

    return (
        <>{isLoading ? <h1><FaSpinner /></h1> :
            order && <div className="">
                <div className="bg-rose-200 cursor-pointer flex items-center w-full text-lg pl-5 p-2">
                    <h1>&#x2190; back to home</h1>
                </div>
                <h1 className="text-4xl ml-14 mt-5 mb-2">Order Details</h1>
                <div className="flex flex-col items-center">
                    <div className="w-11/12 bg-rose-100 rounded-xl shadow-2xl">
                        <div className="flex justify-between p-5">
                            <ul className="content-center items-center w-1/2">
                                <li className="text-lg font-bold cursor-pointer">Order ID: #{order.id}</li>
                                <li>{order.bookingDate}</li>
                                <li className="w-14 rounded-md bg-gray-300"><img src={order.outlets.logoImage} alt="logo"  className="object-contain"/></li>
                                <li className="text-xl font-bold">{order.outlets.outletName}</li>
                            </ul>
                            <ul className="font-bold w-1/2 inline-flex justify-center self-start">
                                <li className="border-none p-2 bg-green-400 rounded-lg">{order.status}</li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 justify-center gap-2">
                            <ul className="w-fit m-auto p-10">
                                <h1 className="text-xl font-bold inline-flex gap-2"><FaUser />Customer</h1>
                                <ul className="flex p-2 pl-10">
                                    <ul className="font-light text-[#696969]">
                                        <li>Name:</li>
                                        <li>Email:</li>
                                        <li>Phone:</li>
                                        <li>PNR:</li>
                                    </ul>
                                    <ul className="pl-3">
                                        <li>{order.customerDetail.fullName}</li>
                                        <li>+91 {order.customerDetail.mobileNumber}</li>
                                        <li>{order.customerDetail.emailId}</li>
                                        <li>{order.pnr}</li>
                                    </ul>
                                </ul>

                            </ul>
                            <ul className="w-fit m-auto p-10 ">
                                <h1 className="text-xl font-bold inline-flex gap-2"><FaCartShopping />Delivery Info</h1>
                                <ul className="flex p-2 pl-10">
                                    <ul className="text-[#696969]">
                                        <li>Station:</li>
                                        <li>Date:</li>
                                        <li>Coach:</li>
                                        <li>Berth:</li>
                                    </ul>
                                    <ul className="pl-3">
                                        <li>{order.stationName},{order.stationCode}</li>
                                        <li>{order.deliveryDate}</li>
                                        <li>{order.coach}</li>
                                        <li>{order.berth}</li>
                                    </ul>
                                </ul>
                            </ul>
                            <ul className="w-fit m-auto p-10">
                                <h1 className="text-xl font-bold inline-flex gap-2"> <FaMoneyCheckDollar />Payment Info</h1>
                                <ul className="flex p-2 pl-10">
                                    <ul className="text-[#696969]">
                                        <li>Payment Type:</li>
                                        <li>Date:</li>
                                        <li>Phone:</li>
                                        <li></li>
                                    </ul>
                                    <ul className="pl-3">
                                        <li>{order.paymentType}</li>
                                        <li>{order.deliveryDate}</li>
                                        <li>+91 {order.customerDetail.mobileNumber}</li>
                                        <li></li>
                                    </ul>
                                </ul>
                            </ul>
                            <ul className="w-fit m-auto p-10">
                                <h1 className="text-xl font-bold inline-flex gap-2"><FaMoneyBill /> Amount</h1>
                                <ul className="flex p-2 pl-10">
                                    <ul className="text-[#696969]">
                                        <li>Item total:</li>
                                        <li>Taxes:</li>
                                        <li>Delivery Charges:</li>
                                        <li>Grand Total:</li>
                                    </ul>
                                    <ul className="pl-3">
                                        <li>&#x20B9;{order.totalAmount}</li>
                                        <li>&#x20B9;{order.gst}</li>
                                        <li>&#x20B9;{order.deliveryCharge}</li>
                                        <li>&#x20B9;{order.payable_amount}</li>
                                    </ul>
                                </ul>
                            </ul>
                        </div><br /><br />
                        <div className="flex flex-col items-center gap-2 w-3/4 m-auto">
                            <h1 className="text-2xl font-bold">Your Order</h1><br />
                            {order && order.orderItems.map((itemData) => (
                                <div className="flex gap-2 w-11/12 justify-between p-5 border-none bg-white rounded-lg">
                                    <ul>
                                    <img src={itemData.isVegeterian ? "/veg.png" : "/nonveg.png"} alt="item logo" className="w-4" />
                                        <li className="font-bold text-lg">{itemData.itemName}</li>
                                        <li className="text-sm">{itemData.description}</li>
                                        <li>&#x20B9;{itemData.basePrice}</li>
                                    </ul>
                                    <ul className="flex gap-5 items-center">
                                        <li>{itemData.quantity}</li>
                                        <li>X</li>
                                        <li className="font-bold">&#x20B9;{JSON.parse((itemData.basePrice * itemData.quantity).toFixed(2))}</li>
                                    </ul>
                                </div>
                            ))}
                        </div><br />
                        <div className="flex flex-col items-center">
                            <ul className="flex flex-col items-center">
                                <li className="font-bold text-lg">{order.outlets.outletName}</li>
                                <li className="inline-flex items-center text-[#696969] text-lg"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7f34yxTYG0KSGuEqSOx7fdQreWcAFdF0EgUkdIlvbww&s" alt="" width={50} />: {order.outlets.fssaiNo}</li>
                            </ul><br />
                        </div>
                    </div>
                </div><br /><br />

            </div>}
        </>
    )
}