import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CartDetails from "./CartInfo";
import { CreateOrderResponse } from "../ApiCall/CreateOrderApi";

export default function CartInfo() {

    const navigate = useNavigate()

    const outletInfo = JSON.parse(window.sessionStorage.getItem("outletInfo"))
    const stationInfo = JSON.parse(window.sessionStorage.getItem("selectedStation"))
    const itemInfo = JSON.parse(window.sessionStorage.getItem("selectedItemInfo"))
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"))
    const trainInfo = JSON.parse(window.sessionStorage.getItem("pnrDetails"))?.trainInfo;
    const seatInfo = JSON.parse(window.sessionStorage.getItem("pnrDetails"))?.seatInfo;
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


    const itemSize = itemList?.length
    if (itemList === 0 || itemSize === undefined) {
        returnToMenu()
    }

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
        const url = "/station/" + stationInfo?.code + "/outlet/" + outletInfo?.id + "/menu"
        navigate(url)
    }





    function createOrder() {
        const fetchData = async () => {
            const response = await CreateOrderResponse(trainInfo, stationInfo, seatInfo, outletInfo, userInfo, itemList, pnr);
            if (response.status === "success") {
                sessionStorage.clear();
                const orderId = response?.result.id;
                console.log(orderId)
                navigate("/order/" + orderId)
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