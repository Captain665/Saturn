import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import OrderInfo from "./OrderInfo";
import { OrderDetailResponse } from "../../ApiCall/OrderInfoAPI";
import { isMobile } from "react-device-detect";

export default function OrderDetails() {
    
    const navigate = useNavigate()
    const { orderId } = useParams()
    const token = JSON.parse(localStorage.getItem("userInfo"))?.jwt;

    const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState()


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await OrderDetailResponse(token, orderId)
            if (response.status === "success") {
                setOrder(response.result)
            }
            setIsLoading(false)
        }
        fetchData()
        return () => { 
            setIsLoading(() => false)
            }
    }, [orderId, token])

    function backToHome() {
        const orders = "/orders"
        const account = "/account"
        const path = isMobile ? orders : account
        navigate(path)
    }



    return (
        <>
            <OrderInfo
                isLoading={isLoading}
                order={order}
                backToHome={backToHome}
            />
        </>
    )
}