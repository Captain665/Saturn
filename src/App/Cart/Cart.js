import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CartDetails from "./CartInfo";

export default function CartInfo() {

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
        console.log(item)
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
        console.log("test")
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



    return (
        <>
            <CartDetails 
            isLoading={isLoading}
            userInfo={userInfo}
            trainInfo={trainInfo}
            stationInfo={stationInfo}
            seatInfo={seatInfo}
            subTotal={subTotal}
            taxes={taxes}
            deliveryCharge={deliveryCharge}
            payable={payable}
            itemList={itemList}
            outletInfo={outletInfo}
            createOrder={createOrder}
            removeItem={removeItem}
            addItem={addItem}
            returnToMenu={() => returnToMenu()}
            />
        </>
    )
}