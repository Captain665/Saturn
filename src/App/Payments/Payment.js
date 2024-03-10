import React, { useState } from "react";
import PaymentInfo from "./PaymentInfo";
import { useNavigate } from "react-router";
import { CreateOrderResponse } from "../ApiCall/CreateOrderApi";
import { isMobile } from "react-device-detect";


export default function Payments() {
    const navigate = useNavigate()

    const outletInfo = JSON.parse(window.sessionStorage.getItem("outletInfo"))
    const stationInfo = JSON.parse(window.sessionStorage.getItem("selectedStation"))
    const itemInfo = JSON.parse(window.sessionStorage.getItem("selectedItemInfo"))
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"))
    const trainInfo = JSON.parse(window.sessionStorage.getItem("pnrDetails"))?.trainInfo;
    const seatInfo = JSON.parse(window.sessionStorage.getItem("pnrDetails"))?.seatInfo;
    const pnr = JSON.parse(window.sessionStorage.getItem("pnr"));

    const [paymentSelection, setPaymentSelection] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const [error, setError] = useState(null)

    const subTotal = JSON.parse(itemInfo?.reduce((a, b) => a + (b.basePrice * b.quantity), 0).toFixed(2))
    const taxes = JSON.parse((subTotal * 0.05).toFixed(2))
    const deliveryCharge = outletInfo?.deliveryCost;
    const payable = Math.round(subTotal + taxes + deliveryCharge)
    

    const selectPaymentMode = (mode) => {
        setPaymentSelection((prevData) => (prevData === mode ? null : mode))
    }

    const backToCart = () => {
        navigate("/cart")   
    }
    const device = isMobile ? "Mobile Web" : "Desktop Web"  
    console.log(device)

    const createOrder = async () => {
        setIsLoading(() => true)
        const response = await CreateOrderResponse(trainInfo, 
            stationInfo, seatInfo, outletInfo, userInfo, itemInfo, pnr, paymentSelection, device);
        if (response.status === "success") {
            sessionStorage.clear();
            const orderId = response?.result.id;
            navigate("/order/".concat(orderId))
            setIsLoading(() => false)
        } else {
            setError(() => response)
            setIsLoading(() => false)
        }
    }


    return (
        <PaymentInfo
            paymentMode={selectPaymentMode}
            proceedToPay={createOrder}
            mode={paymentSelection}
            totalAmount={payable}
            backToCart = {backToCart}
            isLoading = {isLoading}
            error={error}
            totalItem={itemInfo?.length}
            
        />
    )
}