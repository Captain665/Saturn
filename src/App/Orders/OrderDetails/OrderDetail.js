import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import OrderInfo from "./OrderInfo";
import { OrderDetailResponse } from "../../ApiCall/OrderInfoAPI";
import { isMobile } from "react-device-detect";
import SuccessPlacedConfirm from "./SuccessMsg";
import IsLoading from "../../Components/Loading";
import { useSearchParams } from "react-router-dom";
import disableScroll from 'disable-scroll';


export default function OrderDetails() {

    const navigate = useNavigate()
    const { orderId } = useParams()
    const [params, setParams] = useSearchParams();
    const token = JSON.parse(localStorage.getItem("userInfo"))?.jwt;

    const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState()

    const [isShown, setIsShown] = useState(params.get("type") ? true : false)



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

    const backToHome = () => {
        const orders = "/orders"
        const account = "/account"
        const path = isMobile ? orders : account
        navigate(path)
    }
    const handleOnClick = () => {
        setParams()
        setIsShown(() => false)
        disableScroll.off();
    }

    if(isLoading){
        return <IsLoading />
    }


    return (
        <>
            <OrderInfo
                order={order}
                backToHome={backToHome}
            />

            <SuccessPlacedConfirm
                orderId={order?.id}
                shown={isShown}
                handleOnClick={handleOnClick}
            />

        </>
    )
}