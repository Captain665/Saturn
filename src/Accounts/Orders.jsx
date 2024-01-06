import React, { useEffect } from "react";

export default function OrderDetails({ token }) {

    const [orderslist, setOrderList] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    const fetchData = async function getData() {
        setIsLoading(true)
        const requestBody = {
            method: 'GET',
            headers: {
                Authorization: token
            }
        }

        const response = await fetch("orders", requestBody)
        const jsonData = await response.json();
        setOrderList(jsonData.result)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const orderDetails = orderslist.map((item) => (
        <div className="w-full shadow-lg p-5 flex flex-col gap-y-10 rounded-lg" key={item.id}>
            <ul className="top-40">
                <div className="flex">
                    <div className="flex justify-start items-center w-4/6">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3qP_gI3CSPTJSGMnPXOlmByYJ9hAGedIrZ8EYzhxDeQ&s" alt="outlet" className="object-cover overflow-hidden" width={50} height={50}/>
                        <li className="font-bold ml-2">{item.outlets.outletName}</li>
                    </div>
                    <div className=" w-2/6 text-end">
                        <li>{item.paymentType === "CASH_ON_DELIVERY" ? "COD" : item.paymentType}</li>
                    </div>
                </div>
                <li className="font-[1] text-[#9c9c9c]"><span>{item.stationName},   </span> {item.stationCode}</li>
                <hr />
                <li><span className="uppercase text-[#696969] text-xs">Order Number</span> <br />{item.id}</li>
                <li><span className="uppercase text-[#696969] text-xs">Status </span> <br />{item.status}</li>
                <li><span className="uppercase text-[#696969] text-xs">Total Amount </span><br /> &#x20B9; {item.payable_amount}</li>
                <li><span className="uppercase text-[#696969] text-xs">Ordered On </span><br />{item.bookingDate}</li><br />
                <li className="border-2 w-fit inline-flex bg-transparent rounded-lg border-[#ff7e8b] hover:bg-[#ff7e8b]"><span className="p-1 text-[#ff7e8b] hover:text-white">View Details</span></li>
            </ul>
        </div>
    ))


    return (
        <div>
            <h1 className="font-bold text-2xl text-center">Order History</h1><br /><br />
            <div className=" grid grid-cols-2 gap-2 w-full">
                {isLoading ? <h1>Loading...</h1> : orderDetails}
            </div>
        </div>
    )
}