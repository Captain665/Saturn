import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import OrderHtml from "./Orders.html";
import { OrderListResponse } from "../../ApiCall/OrderListApi";

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

        return () => { fetchData() };
    }, [token, navigate])

    function handleViewOrderDetail(order) {
        navigate("/order/" + order.id)
    }

    return (
        <>
            <OrderHtml
                isLoading={isLoading}
                orderslist={orderslist}
                handleViewOrderDetail={(item) => handleViewOrderDetail(item)}
            />
        </>
    )
}