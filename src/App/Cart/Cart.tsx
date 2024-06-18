import React, { createContext, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CartDetails from "./CartInfo";
import IsLoading from "../Components/Loading"
import ErrorToster from "../Components/MessageToggle"
import NoProductExist from "../Components/EmptyPage";
import Spinner from "../Components/Spinner";
import { SeatInfo, Station, TrainInfo, errorState, orderItems, outletInfo, userInfo } from "../CommonTypes/CommonType";
import { GetLocalData, GetSessionData, SetSessionData } from "../Components/CustomHooks";

export const cartInfoContext: any = createContext("");

export interface detailsExpend {
    customer: boolean;
    delivery: boolean
}

export default function CartInfo() {

    const navigate = useNavigate()
    const location = useLocation()

    const [stationInfo] = useState<Station>(GetSessionData("selectedStation"))
    const [userInfo] = useState<userInfo>(GetLocalData("userInfo"));
    const [trainInfo] = useState<TrainInfo>(GetSessionData("pnrDetails")?.trainInfo);
    const [seatInfo] = useState<SeatInfo>(GetSessionData("pnrDetails")?.seatInfo);
    const [outletInfo] = useState<outletInfo>(GetSessionData("cartOutlet") ?? GetSessionData("outletInfo"));
    const [itemList, setItemList] = useState<orderItems[]>(GetSessionData("selectedItemInfo"));
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<errorState>()
    const [redirect, setRedirect] = useState<boolean>(false)
    const [detailsShown, setDetailsShown] = useState<detailsExpend>({
        customer: false,
        delivery: false
    })

    const path: string = location.pathname;

    const returnToMenu = useCallback((): void => {
        if (stationInfo === null || outletInfo === null) {
            navigate("/")
        } else {
            const url: string = "/station/" + stationInfo?.code + "/outlet/" + outletInfo?.id + "/menu"
            navigate(url)
        }
    }, [navigate, stationInfo, outletInfo])

    useEffect((): void => {

        SetSessionData("selectedItemInfo", itemList);
        setTimeout((): void => {
            if (!userInfo) {
                const pathName: string = `/login?redirectedTo=${path}&message=You must log in first.`
                navigate(pathName)
            }
            setIsLoading(false)
        }, 2000)

        setTimeout((): void => {
            if (itemList?.length === 0) {
                setRedirect(true)
            }

        }, 2000)
    }, [itemList, navigate, path, error, userInfo])

    if (redirect) {
        returnToMenu()
    }

    const customerDetailsShown = useCallback((): void => {
        setDetailsShown((prevData): detailsExpend => ({
            ...prevData,
            customer: !prevData.customer
        }))
    }, [])

    const deliveryDetailsShown = useCallback((): void => {
        setDetailsShown((prevData): detailsExpend => ({
            ...prevData,
            delivery: !prevData.delivery
        }))
    }, [])

    const billDetail = (event: any): void => {
        event.preventDefault()
        const bill: any = document.getElementById('bill');
        bill.scrollIntoView({
            behavior: 'smooth'
        })
    }
    const itemSize: number = itemList?.length;
    if (itemSize === 0 || itemSize === undefined) {
        returnToMenu()
    }

    const addItem = useCallback((item: orderItems): void => {
        const index: number = itemList.findIndex(a => a.itemId === item.itemId)
        setItemList((prevData): orderItems[] => {
            const updatedItem: orderItems[] = [...prevData]
            updatedItem[index].quantity += 1;
            return updatedItem
        })
    }, [itemList])

    const removeItem = useCallback((item: orderItems): void => {
        const index: number = itemList.findIndex(a => a.itemId === item.itemId)
        const quantity: number = itemList[index].quantity;
        setItemList((prevData): orderItems[] => {
            if (quantity > 1) {
                const updateItem: orderItems[] = [...prevData]
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

    if (itemSize > 0) {
        const url: string = "https://iticsystem.com/img/empty-cart.png"
        return <NoProductExist isLoading={isLoading} logo={url} />
    }

    const makePayment = (): void => {
        const minOrderAmount: number = outletInfo?.minOrderValue;
        const subTotal: number = JSON.parse(itemList?.reduce((a, b) => a + (b.basePrice * b.quantity), 0).toFixed(2));
        if (subTotal >= minOrderAmount) {
            navigate("/payments")
        } else {
            const msg: errorState = {
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