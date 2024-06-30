import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import OrderHtml from "./Orders.html";
import { OrderListResponse } from "../../ApiCall/OrderListApi";
import Spinner from "../../Components/Spinner";
import IsLoading from "../../Components/Loading";
import { GetLocalData } from "../../Components/CustomHooks";
import { orderDetails, userInfo } from "../../CommonTypes/CommonType";

export default function OrderList() {
    const navigate: NavigateFunction = useNavigate()
    const userInfo: userInfo = GetLocalData("userInfo");

    const auth: string = userInfo?.jwt;

    const [orderslist, setOrderList] = useState<orderDetails[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            setIsLoading(true)
            const response = await OrderListResponse(auth)
            if (response.status === "success") {

            }

            setOrderList(response?.result)
            setIsLoading(false)
        }
        fetchData()
    }, [navigate, auth])

    function handleViewOrderDetail(order: orderDetails): void {
        navigate("/order/" + order.id)
    }

    function HandleBack(): void {
        navigate("/account", { replace: true })
    }

    if (isLoading) {
        return <>
            {/* <Spinner
                isLoading={isLoading}
            /> */}
            <IsLoading
                isLoading={isLoading}
            />

        </>
    }

    return (
        <>
            <OrderHtml
                orderslist={orderslist}
                handleViewOrderDetail={(item: orderDetails) => handleViewOrderDetail(item)}
                handleBack={HandleBack}
            />

            {/* <Spinner
                isLoading={isLoading}
            /> */}
        </>
    )
}