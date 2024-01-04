import React, { useEffect } from "react";

export default function OrderDetails({token}) {

    const [orderslist, setOrderList] = React.useState([])
    const [isLoading,setIsLoading] = React.useState(false)

    const fetchData = async function getData(){
        setIsLoading(true)
        const requestBody = {
            method: 'GET',
            headers:{ 
                Authorization : token
            }   
        }

        const response = await fetch("orders",requestBody)
        const jsonData = await response.json();
        setOrderList(jsonData.result)
        setIsLoading(false)
    }

    console.log(orderslist)

    useEffect(() => {
        fetchData()
    },[])

    const orderDetails = orderslist.map((item) => (
        <div className="w-2/5 shadow-lg">
            <ul>
                <li>Order Number {item.id}</li>
                <li>Status {item.status}</li>
                <li>Total Amount &#x20B9; {item.payable_amount}</li>
                <li>Ordered On {item.bookingDate}</li>
                <li>Delivery Station {item.stationName}</li>
                <li>{item.stationCode}</li>
                <li>View Details</li>
            </ul>
        </div>
    ))


    return (
        <div>
            <h1>Orders</h1>
            <div>
                {isLoading ? <h1>Loading...</h1> : orderDetails}
            </div>
        </div>
    )
}