import React, { createContext, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CartDetails from "./CartInfo";
import IsLoading from "../../App/Components/Loading"
import ErrorToster from "../../App/Components/MessageToggle"
import NoProductExist from "../Components/EmptyPage";
import Spinner from "../../App/Components/Spinner";

export const cartInfoContext = createContext();

export default function CartInfo() {

    const navigate = useNavigate()
    const location = useLocation()

    const [stationInfo] = useState(JSON.parse(sessionStorage.getItem("selectedStation")))
    const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")))
    const [trainInfo] = useState(JSON.parse(sessionStorage.getItem("pnrDetails"))?.trainInfo);
    const [seatInfo] = useState(JSON.parse(sessionStorage.getItem("pnrDetails"))?.seatInfo);
    const [outletInfo] = useState(JSON.parse(sessionStorage.getItem("cartOutlet")) ?? JSON.parse(sessionStorage.getItem("outletInfo")));
    const [itemList, setItemList] = useState(JSON.parse(sessionStorage.getItem("selectedItemInfo")))
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [detailsShown, setDetailsShown] = useState({
        customer: false,
        delivery: false
    })

    const path = location.pathname;

    const returnToMenu = useCallback(() => {
        if (stationInfo === null || outletInfo === null) {
            navigate("/")
        } else {
            const url = "/station/" + stationInfo?.code + "/outlet/" + outletInfo?.id + "/menu"
            navigate(url)
        }
    }, [navigate, stationInfo, outletInfo])

    useEffect(() => {

        window.sessionStorage.setItem("selectedItemInfo", JSON.stringify(itemList))
        setTimeout(() => {
            if (!userInfo) {
                const pathName = `/login?redirectedTo=${path}&message=You must log in first.`
                navigate(pathName)
            }
            setIsLoading(() => false)
        }, 2000)

        setTimeout(() => {
            if (itemList?.length === 0) {
                setRedirect(true)
            }

        }, 2000)
    }, [itemList, navigate, path, error, userInfo])

    if (redirect) {
        returnToMenu()
    }

    const customerDetailsShown = useCallback(() => {
        setDetailsShown(prevData => ({
            ...prevData,
            customer: !prevData.customer
        }))
    }, [])

    const deliveryDetailsShown = useCallback(() => {
        setDetailsShown(prevData => ({
            ...prevData,
            delivery: !prevData.delivery
        }))
    }, [])

    const billDetail = (event) => {
        event.preventDefault()
        const bill = document.getElementById('bill')
        bill.scrollIntoView({
            behavior: 'smooth'
        })
    }
    const itemSize = itemList?.length;
    if (itemList === 0 || itemSize === undefined) {
        returnToMenu()
    }

    const addItem = useCallback((item) => {
        const index = itemList.findIndex(a => a.itemId === item.itemId)
        setItemList(prevData => {
            const updatedItem = [...prevData]
            updatedItem[index].quantity += 1;
            return updatedItem
        })
    }, [itemList])

    const removeItem = useCallback((item) => {
        const index = itemList.findIndex(a => a.itemId === item.itemId)
        const quantity = itemList[index].quantity;
        setItemList(prevData => {
            if (quantity > 1) {
                const updateItem = [...prevData]
                updateItem[index].quantity -= 1;
                return updateItem;
            } else {
                return prevData.filter(a => a.itemId !== item.itemId)
            }
        })
    }, [itemList])


    if (isLoading) {
        return <>
            <IsLoading isLoading={isLoading} />
            <Spinner
                isLoading={isLoading}
            />
        </>


    }

    if (!itemList?.length > 0) {
        const url = "https://iticsystem.com/img/empty-cart.png"
        return <NoProductExist isLoading={isLoading} logo={url} />
    }

    const makePayment = () => {
        const minOrderAmount = outletInfo?.minOrderValue;
        console.log(minOrderAmount)
        const subTotal = JSON.parse(itemList?.reduce((a, b) => a + (b.basePrice * b.quantity), 0).toFixed(2));
        if (subTotal >= minOrderAmount) {
            navigate("/payments")
        } else {
            const msg = {
                status: "failure",
                error: "Your order amount is less than minimum order value of selected outlet",
                result: null
            }
            setError(msg)
        }
    }


    return (
        <>
            <cartInfoContext.Provider value={{
                isLoading, userInfo, trainInfo, stationInfo, customerDetailsShown,
                seatInfo, itemList, outletInfo, detailsShown, deliveryDetailsShown,
                makePayment, removeItem, addItem, returnToMenu, billDetail, itemSize
            }}>
                <CartDetails />
            </cartInfoContext.Provider>

            {error &&
                <ErrorToster
                    props={error}
                />
            }
        </>
    )
}   