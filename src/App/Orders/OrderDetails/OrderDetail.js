import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import OrderInfo from "./OrderInfo";
import { OrderDetailResponse } from "../../ApiCall/OrderInfoAPI";
import { isMobile } from "react-device-detect";
import SuccessPlacedConfirm from "./SuccessMsg";
import IsLoading from "../../Components/Loading";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import ErrorToaster from "../../Components/MessageToggle";


export default function OrderDetails() {

    console.log("order details js running...")

    const navigate = useNavigate()
    const { orderId } = useParams()
    const [params, setParams] = useSearchParams();
    const token = JSON.parse(localStorage.getItem("userInfo"))?.jwt;

    const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState()
    const [error, setError] = useState();
    const [isShown, setIsShown] = useState(params.get("type") ? true : false)



    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await OrderDetailResponse(token, orderId)
            if (response.status === "success") {
                setOrder(response.result)
            }else{
                setError(response)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [orderId, token])

    const backToHome = () => {
        const orders = "/orders"
        const account = "/account"
        const path = isMobile ? orders : account
        navigate(path)
    }
    const handleOnClick = useCallback(() => {
        setParams()
        setIsShown(() => false)
    }, [setParams])

    if (isLoading) {
        return <> 
        <IsLoading />
    
        <Spinner isLoading={isLoading} />
        </> 
        
        
    }


    return (
        <>
            <OrderInfo
                order={order}
                backToHome={backToHome}
            />

            {
                isShown &&
                <SuccessPlacedConfirm
                    orderId={order?.id}
                    shown={isShown}
                    handleOnClick={handleOnClick}
                />
            }

            <ErrorToaster props = {error} />

        </>
    )
}