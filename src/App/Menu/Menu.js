import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MenuList from "./MenuList";
import OutletInfo from "./OutletInfo";
import CartInfo from "./CartInfo";
import { MenuResponse } from "../ApiCall/MenuApi";

export default function MenuItem() {

    const { code, id } = useParams();
    const navigate = useNavigate()

    const outletInfo = JSON.parse(sessionStorage.getItem("outletInfo"))
    const stationInfo = JSON.parse(sessionStorage.getItem("selectedStation"))
    const trainDetail = JSON.parse(sessionStorage.getItem("pnrDetails"))?.trainInfo
    const selectedItem = JSON.parse(sessionStorage.getItem("selectedItemInfo"))
    const pnr = JSON.parse(sessionStorage.getItem("pnr"))

    const [orderItems, setOrderItems] = useState(selectedItem === null ? [] : selectedItem)
    const [menuList, setMenuList] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            const response = await MenuResponse(id)
            if(response.status === "success"){
                const itemList = response.result;
                setMenuList(itemList)
            } else {
                setMenuList(null)
            }
            setIsLoading(false)
        }
        return () => { fetchData() }
    }, [ code, id])

    useEffect(() => {
        window.sessionStorage.setItem("selectedItemInfo", JSON.stringify(orderItems))
    }, [orderItems])


    function addItem(menuItem) {
        const data = {
            itemId: menuItem.id,
            quantity: 1,
            name: menuItem.name,
            description: menuItem.description,
            basePrice: menuItem.basePrice,
            isVegeterian: menuItem.isVegeterian
        }
        const existItemIndex = orderItems.findIndex(item => item.itemId === data.itemId)

        setOrderItems((prevData) => {
            if (existItemIndex !== -1) {
                const updatedItem = [...prevData]
                updatedItem[existItemIndex] = {
                    itemId: prevData[existItemIndex].itemId,
                    quantity: prevData[existItemIndex].quantity + 1,
                    name: prevData[existItemIndex].name,
                    description: prevData[existItemIndex].description,
                    basePrice: prevData[existItemIndex].basePrice,
                    isVegeterian: prevData[existItemIndex].isVegeterian
                }
                return updatedItem;
            } else {
                return [...prevData, data]
            }
        })
    }

    function removeItem(menuItem) {
        const existItem = orderItems.findIndex(a => a.itemId === menuItem.id)
        const existQuantity = orderItems[existItem].quantity;
        setOrderItems(prevData => {
            if (existQuantity > 1) {
                const updatedItem = [...prevData]
                updatedItem[existItem] = {
                    itemId: menuItem.id,
                    quantity: updatedItem[existItem].quantity - 1,
                    name: prevData[existItem].name,
                    description: prevData[existItem].description,
                    basePrice: prevData[existItem].basePrice,
                    isVegeterian: prevData[existItem].isVegeterian
                }
                return updatedItem
            } else {
                return prevData.filter(a => a.itemId !== menuItem.id)
            }
        })
    }


    function handleCheckOut() {
        navigate("/cart")
    }

    function backToOutlet() {
        navigate("/" + pnr + "/outlets/" + code)
    }
    function clearCart(){
        setOrderItems([])        
    }


    

    return (
        <>
            <OutletInfo
                backToOutlet={backToOutlet}
                trainDetail={trainDetail}
                stationInfo={stationInfo}
                outletInfo={outletInfo}
            />

            <MenuList
                menuList={menuList}
                isLoading={isLoading}
                orderItems={orderItems}
                addItem={(menuItem) => addItem(menuItem)}
                removeItem={(menuItem) => removeItem(menuItem)}
            />

            <CartInfo
                orderItems={orderItems}
                handleCheckOut={handleCheckOut}
                clearCart={clearCart}
            />
        </>
    )
}