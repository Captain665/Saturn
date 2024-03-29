import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MenuList from "./MenuList";
import OutletInfo from "./OutletInfo";
import CartInfo from "./CartInfo";
import { MenuResponse } from "../ApiCall/MenuApi";
import Spinner from "../Components/Spinner";
import WarningDialog from "./WarningDialog";
import Filters from "./Filters";

export default function MenuItem() {

    console.log("Menu JS")

    const { code, id } = useParams();
    const navigate = useNavigate();

    const selectedOutletInfo = JSON.parse(sessionStorage.getItem("outletInfo"))
    const outlet = JSON.parse(sessionStorage.getItem("cartOutlet"));
    const selectedItem = JSON.parse(sessionStorage.getItem("selectedItemInfo"))
    const pnr = JSON.parse(sessionStorage.getItem("pnr"));

    const [orderItems, setOrderItems] = useState(selectedItem ?? [])
    const [menuList, setMenuList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [warningDialog, setWarningDialog] = useState(false)

    
    const orderItemsCount = orderItems?.length;

    console.log(orderItemsCount)

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true)
            const response = await MenuResponse(id)
            if (response.status === "success") {
                const itemList = response.result;
                setMenuList(itemList)
                setIsLoading(false)
            } else {
                setMenuList(null)
                setIsLoading(false)
            }
        }
        fetchData()
        return () => {
            setIsLoading(false)
        }
    }, [code, id])

    useEffect(() => {
        window.sessionStorage.setItem("selectedItemInfo", JSON.stringify(orderItems))
    }, [orderItems])

    const isValidoutlet = () => {
        if (!outlet || outlet?.id === selectedOutletInfo?.id || orderItemsCount === 0) {
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

            setWarningDialog(true)
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
        const outletPath = "/" + pnr + "/stations/outlets/" + code;
        navigate(outletPath, { replace: true })
    }

    const handleCancel = () => {
        setWarningDialog(false);
    }
    const handleContiue = () => {
        setOrderItems([])
        sessionStorage.removeItem("cartOutlet")
        setWarningDialog(false)
    }



    const [itemFilter, setItemFilter] = useState({ isVeg: null, amountSort: null })

    function applyVegFilter(veg) {
        veg === itemFilter.isVeg
            ? setItemFilter(prevData => ({
                ...prevData,
                isVeg: null
            }))
            : setItemFilter(prevData => ({
                ...prevData,
                isVeg: veg
            }))
    }

    function applyPriceFilter(value) {
        value === itemFilter.amountSort
            ? setItemFilter(prevData => ({
                ...prevData,
                amountSort: null
            }))
            : setItemFilter(prevData => ({
                ...prevData,
                amountSort: value
            }))
    }


    const VegList = itemFilter?.isVeg
        ? menuList.filter(veg => veg.isVegeterian === (itemFilter.isVeg === "veg") ? true : false)
        : menuList;

    const menuItemList = itemFilter?.amountSort ?
        (itemFilter.amountSort === "hightoLow" ?
            VegList.toSorted((a, b) => b.basePrice - a.basePrice)
            : VegList.toSorted((a, b) => a.basePrice - b.basePrice)
        )
        : VegList




    return (
        <>
            <OutletInfo
                outletInfo={selectedOutletInfo}
                backToOutlet={backToOutlet}
            />

            <Filters
                vegFilter={(type) => applyVegFilter(type)}
                priceFilter={(value) => applyPriceFilter(value)}
                active={itemFilter}
            />

            <MenuList
                menuList={menuItemList}
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
