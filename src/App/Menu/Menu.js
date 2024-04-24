import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MenuList from "./MenuList";
import OutletInfo from "./OutletInfo";
import CartInfo from "./CartInfo";
import { MenuResponse } from "../ApiCall/MenuApi";
import Spinner from "../Components/Spinner";
import WarningDialog from "./WarningDialog";
import Filters from "./Filters";
import ErrorToster from "../Components/MessageToggle";

export default function MenuItem() {

    const { code, id } = useParams();
    const navigate = useNavigate();

    const [selectedOutletInfo] = useState(JSON.parse(sessionStorage.getItem("outletInfo")))
    const outlet = JSON.parse(sessionStorage.getItem("cartOutlet"));
    const pnr = JSON.parse(sessionStorage.getItem("pnr"));

    const [orderItems, setOrderItems] = useState(JSON.parse(sessionStorage.getItem("selectedItemInfo")) ?? [])
    const [menuList, setMenuList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [warningDialog, setWarningDialog] = useState(false)
    const [filters, setFilters] = useState({ isVeg: null, amountSort: null })

    const orderItemsCount = orderItems?.length;
    const [error, setError] = useState(null);

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
    }, [code, id])

    useEffect(() => {
        window.sessionStorage.setItem("selectedItemInfo", JSON.stringify(orderItems))
    }, [orderItems])

    const isValidoutlet = useCallback(() => {
        if (outlet?.id === selectedOutletInfo?.id || orderItemsCount === 0) {
            sessionStorage.setItem("cartOutlet", JSON.stringify(selectedOutletInfo));
            return true;
        }
        else {
            return false
        }
    }, [orderItemsCount, selectedOutletInfo, outlet])


    const addItem = useCallback((menuItem) => {
        const existItemIndex = orderItems.findIndex(a => a.itemId === menuItem.id)
        if (isValidoutlet()) {
            setOrderItems((prevData) => {
                if (existItemIndex !== -1) {
                    const updatedItem = [...prevData]
                    updatedItem[existItemIndex].quantity += 1
                    return updatedItem;
                } else {
                    return [...prevData, {
                        itemId: menuItem.id,
                        quantity: 1,
                        name: menuItem.name,
                        description: menuItem.description,
                        basePrice: menuItem.basePrice,
                        isVegeterian: menuItem.isVegeterian
                    }]
                }
            })
        } else {
            setWarningDialog(true)
        }
    }, [orderItems, isValidoutlet])


    const removeItem = useCallback((itemId) => {
        const existItem = orderItems.findIndex(a => a.itemId === itemId)
        const existQuantity = orderItems[existItem].quantity;
        setOrderItems(prevData => {
            if (existQuantity > 1) {
                const updatedItem = [...prevData]
                updatedItem[existItem].quantity -= 1
                return updatedItem
            } else {
                return prevData.filter(a => a.itemId !== itemId)
            }
        })
    }, [orderItems])

    const handleCheckOut = () => {
        const minOrdeAmount = outlet?.minOrderValue;
        const itemAmount = JSON.parse(orderItems.reduce((a, b) => a + (b.basePrice * b.quantity), 0).toFixed(2));
        if (itemAmount >= minOrdeAmount) {
            navigate("/cart")
        } else {
            const msg = {
                status: "failure",
                error: "Your order amount is less than minimum order value of selected outlet",
                result: null
            }
            setError(msg)
        }

    }


    const backToOutlet = useCallback(() => {
        const outletPath = "/" + pnr + "/stations/outlets/" + code;
        navigate(outletPath, { replace: true })
    }, [navigate, code, pnr])


    const handleCancel = useCallback(() => {
        setWarningDialog(false);
    }, [])


    const handleContiue = useCallback(() => {
        setOrderItems([])
        sessionStorage.removeItem("cartOutlet")
        setWarningDialog(false)
    }, [])


    const applyVegFilter = useCallback((veg) => {
        veg === filters.isVeg
            ? setFilters(prevData => ({
                ...prevData,
                isVeg: null
            }))
            : setFilters(prevData => ({
                ...prevData,
                isVeg: veg
            }))
    }, [filters])


    const applyPriceFilter = useCallback((value) => {
        value === filters.amountSort
            ? setFilters(prevData => ({
                ...prevData,
                amountSort: null
            }))
            : setFilters(prevData => ({
                ...prevData,
                amountSort: value
            }))
    }, [filters])


    const VegList = filters?.isVeg
        ? menuList.filter(veg => veg.isVegeterian === (filters.isVeg === "veg") ? true : false)
        : menuList;


    const menuItemList = filters?.amountSort ?
        (filters.amountSort === "hightoLow" ?
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
                vegFilter={applyVegFilter}
                priceFilter={applyPriceFilter}
                active={filters}
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
            />

            <Spinner isLoading={isLoading} />

            {warningDialog ? <WarningDialog
                orderItemsCount={orderItemsCount}
                handleCancel={handleCancel}
                handleContiue={handleContiue}
                outlet={outlet} />
                : null
            }
            <ErrorToster props={error} />
        </>
    )
}
