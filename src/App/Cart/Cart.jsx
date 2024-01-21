import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaSpinner } from "react-icons/fa6";

export default function CartDetails() {
    const navigate = useNavigate()

    const outletInfo = JSON.parse(window.sessionStorage.getItem("outletInfo"))
    const stationInfo = JSON.parse(window.sessionStorage.getItem("selectedStation"))
    const itemInfo = JSON.parse(window.sessionStorage.getItem("selectedItemInfo"))
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"))
    const trainInfo = JSON.parse(window.sessionStorage.getItem("pnrDetails")).trainInfo;
    const seatInfo = JSON.parse(window.sessionStorage.getItem("pnrDetails")).seatInfo;
    const pnr = JSON.parse(window.sessionStorage.getItem("pnr"));

    const [itemList, setItemList] = useState(itemInfo)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        window.sessionStorage.setItem("selectedItemInfo", JSON.stringify(itemList))
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        setIsLoading(true)
    }, [itemList])


    const subTotal = itemList.reduce((a, b) => a + (b.basePrice * b.quantity), 0)
    const taxes = JSON.parse((subTotal * 0.05).toFixed(2))
    const deliveryCharge = outletInfo.deliveryCost;
    const payable = Math.round(subTotal + taxes + deliveryCharge)


    function addItem(item) {
        const index = itemList.findIndex(a => a.itemId === item.itemId)
        setItemList(prevData => {
            const updatedItem = [...prevData]
            updatedItem[index] = {
                itemId: prevData[index].itemId,
                quantity: prevData[index].quantity + 1,
                name: prevData[index].name,
                description: prevData[index].description,
                basePrice: prevData[index].basePrice,
                isVegeterian: prevData[index].isVegeterian
            }
            return updatedItem
        })
    }
    function removeItem(item) {
        const index = itemList.findIndex(a => a.itemId === item.itemId)
        const quantity = itemList[index].quantity;
        setItemList(prevData => {
            if (quantity > 1) {
                const updateItem = [...prevData]
                updateItem[index] = {
                    itemId: prevData[index].itemId,
                    quantity: prevData[index].quantity - 1,
                    name: prevData[index].name,
                    description: prevData[index].description,
                    basePrice: prevData[index].basePrice,
                    isVegeterian: prevData[index].isVegeterian
                }
                return updateItem;
            } else {
                return prevData.filter(a => a.itemId !== item.itemId)
            }
        })
    }


    function returnToMenu() {
        const url = "/station/" + stationInfo.code + "/outlet/" + outletInfo.id + "/menu"
        navigate(url)
    }

    if (itemList.length === 0) {
        returnToMenu()
    }

    const body = {
        "trainName": trainInfo.name,
        "trainNo": trainInfo.trainNo,
        "stationCode": stationInfo.code,
        "stationName": stationInfo.name,
        "deliveryDate": stationInfo.depDate + " " + stationInfo.departure,
        "coach": seatInfo.coach,
        "berth": seatInfo.berth,
        "outletId": outletInfo.id,
        "customerId": userInfo.id,
        "pnr": pnr,
        "paymentType": "CASH_ON_DELIVERY",
        "deliveryCharge": outletInfo.deliveryCost,
        "orderFrom": "desktop Web",
        "orderItem": itemList
    }

    function createOrder() {
        console.log("create")
        const requestBody = {
            method: "POST",
            headers: {
                "Authorization": userInfo.jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(body)
        }
        const fetchData = async () => {

            const response = await fetch("/create/order", requestBody);
            const jsonData = await response.json();
            if (response.status === 201) {
                sessionStorage.clear();
                navigate("/order/" + jsonData.result.id)
            }
        }

        fetchData()
    }


    const deliveryDetails = (
        <div className=" w-1/3 rounded-xl shadow-md bg-rose-200 h-fit">
            <p className="font-medium text-2xl text-center bg-rose-300 p-4 rounded-md">Deliver to </p><br />
            <ol className="p-4 bg-white m-2 rounded-md">
                <li className="font-semibold text-lg">Passanger Details</li>
                <li>Name : {userInfo.fullName}</li>
                <li>Mobile Number : {userInfo.mobileNumber}</li>
                <li>Email : {userInfo.emailId}</li>
            </ol><br />
            <ol className="p-4 bg-white m-2 rounded-md">
                <ul>
                    <li className="font-semibold text-lg">Journey Details</li>
                    <li>Train : {trainInfo.trainNo} - {trainInfo.name}</li>
                    <li>From : {trainInfo.boarding} to {trainInfo.destination} on {trainInfo.dt}</li>
                </ul><br />
                <ul>
                    <li className="font-semibold text-lg">Delivery Details</li>
                    <li className="">Station : {stationInfo.name} {stationInfo.code}</li>
                    <li>Time : {stationInfo.depDate} {stationInfo.departure}</li>
                    <li>Coach : {seatInfo.coach}</li>
                    <li>Berth : {seatInfo.berth}</li>
                </ul>
            </ol>
        </div>
    )

    const itemDetails = (
        <div className="w-2/3 bg-rose-200 rounded-xl shadow-md flex flex-col align-center align-top h-fit">
            <p className="text-center font-medium text-2xl p-4 shadow-lg bg-rose-300 rounded-md">Cart Summary</p>
            <ul className="bg-white p-2 gap-10 h-16 flex w-11/12 self-center m-2 rounded-md">
                <img src={outletInfo.logoImage} alt="outlet logo" className="object-cover" width={80} />
                <li className="font-bold text-2xl">{outletInfo.outletName}</li>
            </ul>
            {itemList && itemList.map(item => (
                <ul className="p-4 bg-white w-11/12 self-center content-center shadow-md m-2 rounded-lg flex" key={item.itemId}>
                    <ul className="w-3/4">
                        <img src={item.isVegeterian ? "/veg.png" : "/nonveg.png"} alt="item logo" className="w-4" />
                        <li className="text-lg">{item.name}</li>
                        <li className="text-xs opacity-80">{item.description}</li>
                        <li className="">&#x20B9;{item.basePrice}</li>
                    </ul>
                    <ul className="flex w-1/4 justify-around self-center">
                        <li className="h-fit">&#x20B9;{item.basePrice * item.quantity}</li>
                        <ul className="flex gap-3 border-2 h-fit rounded-md px-2 bg-white">
                            <li className="text-xl cursor-pointer" onClick={() => removeItem(item)}>-</li>
                            <li className="text-lg">{item.quantity}</li>
                            <li className="text-xl cursor-pointer" onClick={() => addItem(item)}>+</li>
                        </ul>
                    </ul>
                </ul>
            ))}
            <br />
        </div>
    )
    const paymentDetails = (
        <ul className="bg-white rounded border-2">
            <p className="text-center bg-rose-300 p-5 text-xl font-medium rounded">Payment Details </p>
            <ul className="flex p-5 justify-between gap-2">
                <ul className="text-lg">
                    <li className="">Subtotal : </li>
                    <li>Taxes :</li>
                    <li>Delivery Charges :</li>
                    <li className="font-bold">Total Payable : </li>
                </ul>
                <ul className="text-lg">
                    <li>&#x20B9;{subTotal}</li>
                    <li>&#x20B9;{taxes}</li>
                    <li>&#x20B9;{deliveryCharge}</li>
                    <li className="font-bold">&#x20B9;{payable}</li>
                </ul>
            </ul>
            <button type="submit" className="bg-rose-500 w-full p-2 text-xl rounded border-none" onClick={createOrder}>Place Order</button>
        </ul>
    )


    return (
        <> {isLoading ? <h1 className="h-screen w-fit m-auto flex items-center text-4xl animate-spin"><FaSpinner /></h1> :
            <>
                <div className="bg-rose-100 cursor-pointer flex justify-between p-2" onClick={returnToMenu}>
                    <p><span className="font-bold text-2xl w-1/2 pl-8">&#x2190;</span> Menu Items</p>
                    <p className="font-medium text-4xl w-1/2 text-start">Your Cart</p>
                </div>
                <div className="w-11/12 self-center m-6 flex gap-5 align-top">
                    {deliveryDetails}
                    {itemDetails}
                </div>
                <div className="self-center w-2/5 h-fit">
                    {paymentDetails}
                </div><br />
            </>
        }

        </>
    )
}