import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

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
        <>{isLoading ? <h1>Loading...</h1> :
            order && <div className="bg-gray-400">
                <div className="bg-green-100 cursor-pointer flex items-center w-full text-lg pl-5 p-2">
                    <h1>&#x2190; back to home</h1>
                </div>
                <h1 className="text-4xl ml-5">Order Details</h1>
                <div className="flex flex-col items-center">
                    <div className="w-11/12 bg-slate-300 rounded-xl shadow-2xl">
                        <div className="flex justify-between p-5">
                            <ul className="content-center items-center">
                                <li className="text-lg">Order ID: #{order.id}</li>
                                <li>{order.bookingDate}</li>
                                <li><img src={order.outlets.logoImage} alt="outletLogo" /></li>
                                <li>{order.outlets.outletName}</li>
                            </ul>
                            <ul className="font-bold">
                                <li>{order.status}</li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 justify-center p-5 gap-10">
                            <ul className="w-fit m-auto">
                                <h1 className="text-xl">Customer</h1>
                                <ul className="flex p-2 pl-10">
                                    <ul className="">
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
                            <ul className="w-fit m-auto">
                                <h1 className="text-xl">Delivery Info</h1>
                                <ul className="flex p-2 pl-10">
                                    <ul>
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
                            <ul className="w-fit m-auto">
                                <h1 className="text-xl">Payment Info</h1>
                                <ul className="flex p-2 pl-10">
                                    <ul>
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
                            <ul className="w-fit m-auto">
                                <h1 className="text-xl">Amount</h1>
                                <ul className="flex p-2 pl-10">
                                    <ul>
                                        <li>Item total:</li>
                                        <li>Taxes:</li>
                                        <li>Delivery Charges:</li>
                                        <li>Grand Total:</li>
                                    </ul>
                                    <ul className="pl-3">
                                        <li>{order.totalAmount}</li>
                                        <li>{order.gst}</li>
                                        <li>{order.deliveryCharge}</li>
                                        <li>{order.payable_amount}</li>
                                    </ul>
                                </ul>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-2xl">Your Order</h1>
                            {order && order.orderItems.map((itemData) => (
                                <div>
                                    <h1>{itemData.itemName}</h1>
                                </div>
                            ))}
                        </div>
                        <div>
                            <ul>
                                <li>{order.outlets.outletName}</li>
                                <li>fssai</li>
                                <li>lic no. {order.outlets.fssaiNo}</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>}
        </>
    )
}