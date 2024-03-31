import React, { useCallback, useState } from "react";
import PaymentInfo from "./PaymentInfo";
import { useLocation, useNavigate } from "react-router";
import { CreateOrderResponse } from "../ApiCall/CreateOrderApi";
import { isMobile } from "react-device-detect";
import Spinner from "../Components/Spinner";
import ErrorToster from "../Components/MessageToggle";


export default function Payments() {
    
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname;

    const outletInfo = JSON.parse(sessionStorage.getItem("outletInfo"))
    const stationInfo = JSON.parse(sessionStorage.getItem("selectedStation"))
    const itemInfo = JSON.parse(sessionStorage.getItem("selectedItemInfo"))
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const trainInfo = JSON.parse(sessionStorage.getItem("pnrDetails"))?.trainInfo;
    const seatInfo = JSON.parse(sessionStorage.getItem("pnrDetails"))?.seatInfo;
    const pnr = JSON.parse(sessionStorage.getItem("pnr"));

    const [paymentSelection, setPaymentSelection] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState(null)

    const subTotal = JSON.parse(itemInfo?.reduce((a, b) => a + (b.basePrice * b.quantity), 0).toFixed(2))
    const taxes = JSON.parse((subTotal * 0.05).toFixed(2))
    const deliveryCharge = outletInfo?.deliveryCost;
    const payable = Math.round(subTotal + taxes + deliveryCharge)


    const selectPaymentMode = useCallback((mode) => {
        setPaymentSelection((prevData) => (prevData === mode ? null : mode))
    }, [])

    const backToCart = useCallback(() => {
        navigate("/cart")
    }, [navigate])

    const device = isMobile ? "Mobile Web" : "Desktop Web"

    const createOrder = async () => {
        setIsLoading(() => true)
        const response = await CreateOrderResponse(trainInfo,
            stationInfo, seatInfo, outletInfo, userInfo, itemInfo, pnr, paymentSelection, device);
        if (response.status === "success") {
            sessionStorage.clear();
            const orderId = response?.result.id;
            const path = "/order/" + orderId + "?type=new"
            navigate(path)
            setIsLoading(() => false)
        } else {
            setError(() => response)
            setIsLoading(() => false)
        }
    }

    if (error?.error === "Not authorize to Access") {
        localStorage.clear();
        const pathName = `/login?redirectedTo=${path}&message=You must log in first.`
        navigate(pathName)
    }


    return (
        <>
            <PaymentInfo
                paymentMode={selectPaymentMode}
                proceedToPay={createOrder}
                mode={paymentSelection}
                totalAmount={payable}
                backToCart={backToCart}
                isLoading={isLoading}
                totalItem={itemInfo?.length}
            />
            {isLoading && <Spinner isLoading={isLoading} />}

            {error && <ErrorToster props={error} />}
        </>
    )
}