import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function OrderDetail(){
    const { orderId } = useParams()
    const token = JSON.parse(localStorage.getItem("userInfo")).jwt;

    const [order,setOrder] = useState()

    useEffect(() => {
        const fetchData = async () =>{
            const requestBody = {
                method : "GET",
                headers: {
                    Authorization: token
                }
            }

            const response = await fetch("/order/"+orderId,requestBody)
            const jsonData = await response.json();
            if(response.ok){
                setOrder(jsonData.result)
            }
        }
        return () => {fetchData()}
    },[])

    console.log(order)
    return(
        <h1>this is order details page</h1>
    )
}