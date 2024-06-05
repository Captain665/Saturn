import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import OrderHtml from "./Orders.html";
import { OrderListResponse } from "../../ApiCall/OrderListApi";
import Spinner from "../../Components/Spinner";
import IsLoading from "../../Components/Loading";
import { GetLocalData } from "../../Components/CustomHooks";

export default function OrderList() {
    const navigate = useNavigate()
    const userInfo = GetLocalData("userInfo");

    const auth = userInfo.jwt;

    const [orderslist, setOrderList] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await OrderListResponse(auth)
            if (response.status === "success") {

            }

            setOrderList(response.result)
            setIsLoading(false)
        }
        fetchData()
        return () => {
            setIsLoading(() => false)
        };
    }, [navigate, auth])

    function handleViewOrderDetail(order) {
        navigate("/order/" + order.id)
    }

    function HandleBack() {
        navigate("/account", { replace: true })
    }

    if (isLoading) {
        return <>
            <Spinner
                isLoading={isLoading}
            />
            <IsLoading />

        </>
    }

    return (
        <>
            <OrderHtml
                orderslist={orderslist}
                handleViewOrderDetail={(item) => handleViewOrderDetail(item)}
                handleBack={HandleBack}
            />

            <Spinner
                isLoading={isLoading}
            />
        </>
    )
}