import React, { memo } from "react";
import { FaUser, FaCartShopping, FaMoneyCheckDollar, FaMoneyBill } from "react-icons/fa6";

function CustomerAndPaymentInfo({ order }) {
    return (
        <>

            {order && <div className="grid grid-cols-2 justify-center gap-2">
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
            </div>}<br /><br />
        </>
    )
}

export default memo(CustomerAndPaymentInfo);