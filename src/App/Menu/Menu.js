import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MenuList from "./MenuList";
import OutletInfo from "./OutletInfo";
import CartInfo from "./CartInfo";
import { MenuResponse } from "../ApiCall/MenuApi";
import Spinner from "../Components/Spinner";
import WarningDialog from "./WarningDialog";

export default function MenuItem() {

    const { code, id } = useParams();
    const navigate = useNavigate();

    const selectedOutletInfo = JSON.parse(sessionStorage.getItem("outletInfo"))
    const outlet = JSON.parse(sessionStorage.getItem("cartOutlet"));
    const selectedItem = JSON.parse(sessionStorage.getItem("selectedItemInfo"))
    const pnr = JSON.parse(sessionStorage.getItem("pnr"));
    const stationInfo = JSON.parse(sessionStorage.getItem("selectedStation"))

    const [orderItems, setOrderItems] = useState(selectedItem === null ? [] : selectedItem)
    const [menuList, setMenuList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [warningDialog, setWarningDialog] = useState(false)

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

    const isValidoutlet = () => {
        if (!outlet || outlet?.id === selectedOutletInfo?.id) {
            sessionStorage.setItem("cartOutlet", JSON.stringify(selectedOutletInfo));
            return true;
        }
        else {
            return false
        }
    }



    const addItem = (menuItem) => {
        const data = {
            itemId: menuItem.id,
            quantity: 1,
            name: menuItem.name,
            description: menuItem.description,
            basePrice: menuItem.basePrice,
            isVegeterian: menuItem.isVegeterian
        }
        const existItemIndex = orderItems.findIndex(item => item.itemId === data.itemId)
        const validOutlet = isValidoutlet();
        if (validOutlet) {
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
        } else {

            setWarningDialog(() => true)
        }

    }

    const removeItem = (menuItem) => {
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


    const handleCheckOut = () => {
        navigate("/cart")
    }

    const backToOutlet = () => {
        const outletPath = "/" + pnr + "/stations/outlets/" + stationInfo.code;
        navigate(outletPath, { replace: true })
    }

    const handleCancel = () => {
        setWarningDialog(() => false);
    }
    const handleContiue = () => {
        setOrderItems(() => [])
        sessionStorage.removeItem("cartOutlet")
        setWarningDialog(() => false)
    }
    const orderItemsCount = orderItems?.length;



    return (
        <>
            <OutletInfo
                outletInfo={selectedOutletInfo}
                backToOutlet={backToOutlet}
            />

            <MenuList
                menuList={menuList}
                isLoading={isLoading}
                orderItems={orderItems}
                addItem={addItem}
                removeItem={removeItem}
            />

            <CartInfo
                orderItemsCount={orderItemsCount}
                handleCheckOut={handleCheckOut}
                outlet={outlet}
            />
            <Spinner isLoading={isLoading} />
            {
                warningDialog
                    ? <WarningDialog
                        orderItemsCount={orderItemsCount}
                        handleCancel={handleCancel}
                        handleContiue={handleContiue}
                        outlet={outlet}
                    />
                    : null
            }
        </>
    )
}
