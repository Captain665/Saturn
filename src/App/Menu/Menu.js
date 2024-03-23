import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MenuList from "./MenuList";
import OutletInfo from "./OutletInfo";
import CartInfo from "./CartInfo";
import { MenuResponse } from "../ApiCall/MenuApi";
import Spinner from "../Components/Spinner";

export const outletData = createContext();
export const menuData = createContext();

export default function MenuItem() {

    const { code, id } = useParams();
    const navigate = useNavigate()
    // const outletInfo = useContext(JSON.parse(sessionStorage.getItem("outletInfo")));

   

    const selectedOutletInfo = JSON.parse(sessionStorage.getItem("outletInfo"))
    // const stationInfo = JSON.parse(sessionStorage.getItem("selectedStation"))
    // const trainDetail = JSON.parse(sessionStorage.getItem("pnrDetails"))?.trainInfo
    const selectedItem = JSON.parse(sessionStorage.getItem("selectedItemInfo"))

    const [orderItems, setOrderItems] = useState(selectedItem === null ? [] : selectedItem)
    const [menuList, setMenuList] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true)
            const response = await MenuResponse(id)
            if (response.status === "success") {
                const itemList = response.result;
                setMenuList(itemList)
                setIsLoading(() => false)
            } else {
                setMenuList(null)
                setIsLoading(() => false)
            }
        }
        fetchData()
        return () => {
            setIsLoading(() => false)
        }
    }, [code, id])

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
        navigate(-1, { replace: true })
    }



    return (
        <>
            <outletData.Provider value={{selectedOutletInfo, backToOutlet}}>
                <OutletInfo />
            </outletData.Provider>


            <menuData.Provider value={{ menuList, isLoading, orderItems, addItem, removeItem }}>
                <MenuList />
            </menuData.Provider>

            <CartInfo
                orderItems={orderItems}
                handleCheckOut={handleCheckOut}
            />
            <Spinner isLoading={isLoading} />
        </>
    )
}
