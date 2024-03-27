import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CartDetails from "./CartInfo";
import ErrorToster from "../../App/Components/MessageToggle"



export default function CartInfo() {

    const navigate = useNavigate()
    const location = useLocation()

    const cartOutlet = JSON.parse(sessionStorage.getItem("cartOutlet"))
    const stationInfo = JSON.parse(sessionStorage.getItem("selectedStation"))
    const itemInfo = JSON.parse(sessionStorage.getItem("selectedItemInfo"))
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const trainInfo = JSON.parse(sessionStorage.getItem("pnrDetails"))?.trainInfo;
    const seatInfo = JSON.parse(sessionStorage.getItem("pnrDetails"))?.seatInfo;
    const outletInfo = JSON.parse(sessionStorage.getItem("outletInfo"));


    const [itemList, setItemList] = useState(itemInfo)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const path = location.pathname;


    const returnToMenu = () => {
        const url = "/station/" + stationInfo?.code + "/outlet/" + outletInfo?.id + "/menu"
        navigate(url)
    }

    useEffect(() => {

        window.sessionStorage.setItem("selectedItemInfo", JSON.stringify(itemList))
        setTimeout(() => {
            if (!userInfo || error?.error === "Not authorize to Access") {
                const pathName = `/login?redirectedTo=${path}&message=You must log in first.`
                navigate(pathName)
            }
            setIsLoading(() => false)
        }, 2000)

        setTimeout(() => {
            if (itemList.length === 0) {
                setRedirect(true)
            }
        }, 2000)
        return () => { setError(false) }
    }, [itemList, navigate, path, error, userInfo])

    if(redirect){
        returnToMenu()
    }




    const itemSize = itemList?.length;
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

    const makePayment = () => {
        navigate("/payments")
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
                outletInfo={cartOutlet}
                makePayment={makePayment}
                removeItem={removeItem}
                addItem={addItem}
                returnToMenu={returnToMenu}
            />
            <ErrorToster
                props={error}
            />
        </>
    )
}