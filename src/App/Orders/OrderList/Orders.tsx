import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import OrderHtml from "./Orders.html";
import Spinner from "../../Components/Spinner";
import IsLoading from "../../Components/Loading";
import { orderDetails } from "../../CommonTypes/CommonType";
import useGetRequest from "../../ApiCall/GetRequest";
import ErrorToaster from "../../Components/MessageToggle";
import NoProductExist from "../../Components/EmptyPage";

export default function OrderList() {
    const navigate: NavigateFunction = useNavigate()

    const { data, isLoading, error, fetch } = useGetRequest();
    const [orderslist, setOrderList] = useState<orderDetails[]>([])


    useEffect((): void => {
        fetch("/orders")
    }, [])

    useEffect(() => {
        if (data) {
            setOrderList(data)
        }
    }, [data])

    function handleViewOrderDetail(order: orderDetails): void {
        navigate("/order/" + order?.id)
    }

    function HandleBack(): void {
        navigate("/account", { replace: true })
    }

    if (isLoading) {
        return <>
            <Spinner
                isLoading={isLoading}
            />
            <IsLoading
                isLoading={isLoading}
            />
        </>
    }
    if (orderslist?.length === 0) {
        return <NoProductExist isLoading={isLoading} logo={null} />
    }

    return (
        <>
            <OrderHtml
                orderslist={orderslist}
                handleViewOrderDetail={(item: orderDetails) => handleViewOrderDetail(item)}
                handleBack={HandleBack}
            />

            <Spinner
                isLoading={isLoading}
            />
            
            {error && <ErrorToaster props={error} />}
        </>
    )
}