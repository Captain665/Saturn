import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import OrderHtml from "./Orders.html";
import { OrderListResponse } from "../../ApiCall/OrderListApi";
import Spinner from "../../Components/Spinner";

export default function OrderList({ token }) {
    const navigate = useNavigate()
    const jwt = JSON.parse(localStorage.getItem("userInfo"))?.jwt;

    const auth = token === undefined ? jwt : token

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
    }, [token, navigate, auth])

    function handleViewOrderDetail(order) {
        navigate("/order/" + order.id)
    }

    function HandleBack() {
        navigate("/account", { replace: true })
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