import React, { useCallback, useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router";
import MenuList from "./MenuList";
import OutletInfo from "./OutletInfo";
import CartInfo from "./CartInfo";
import { MenuResponse } from "../ApiCall/MenuApi";
import Spinner from "../Components/Spinner";
import WarningDialog from "./WarningDialog";
import Filters from "./Filters";
import ErrorToster from "../Components/MessageToggle";
import { GetSessionData, SetSessionData } from "../Components/CustomHooks";
import { errorState, menuInfo, orderItems, outletInfo } from "../CommonTypes/CommonType";

export default function MenuItem() {

    const { code, id }: Readonly<Params<string>> = useParams();
    const navigate = useNavigate();

    const [selectedOutletInfo] = useState<outletInfo>(GetSessionData("outletInfo"))
    const outlet: outletInfo = GetSessionData("CartOutlet");
    const pnr: string = GetSessionData("pnr");

    const [orderItems, setOrderItems] = useState<orderItems[]>(GetSessionData("selectedItemInfo"));
    const [menuList, setMenuList] = useState<menuInfo[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [warningDialog, setWarningDialog] = useState<boolean>(false)
    const [filters, setFilters] = useState<{ isVeg: string | null, amountSort: string | null }>({ isVeg: "", amountSort: "" })

    const orderItemsCount: number = orderItems?.length;
    const [error, setError] = useState<errorState>();

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            setIsLoading(true)
            const response = await MenuResponse(id)
            if (response?.status === "success") {
                const itemList: menuInfo[] = response?.result;
                setMenuList(itemList)
                setIsLoading(false)
            } else {
                setMenuList([])
                setIsLoading(false)
            }
        }
        fetchData()
    }, [code, id])

    useEffect((): void => {
        SetSessionData("selectedItemInfo", orderItems)
    }, [orderItems])

    const isValidoutlet = useCallback((): boolean => {
        if (outlet?.id === selectedOutletInfo?.id || orderItemsCount === 0) {
            SetSessionData("cartOutlet", selectedOutletInfo);
            return true;
        }
        else {
            return false
        }
    }, [orderItemsCount, selectedOutletInfo, outlet])


    const addItem = useCallback((menuItem: menuInfo): void => {
        const existItemIndex: number = orderItems.findIndex(a => a.itemId === menuItem.id)
        if (isValidoutlet()) {
            setOrderItems((prevData): orderItems[] => {
                if (existItemIndex !== -1) {
                    const updatedItem: orderItems[] = [...prevData]
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


    const removeItem = useCallback((itemId: number) => {
        const existItem: number = orderItems.findIndex(a => a.itemId === itemId)
        const existQuantity: number = orderItems[existItem].quantity;
        setOrderItems((prevData): orderItems[] => {
            if (existQuantity > 1) {
                const updatedItem = [...prevData]
                updatedItem[existItem].quantity -= 1
                return updatedItem
            } else {
                return prevData.filter(a => a.itemId !== itemId)
            }
        })
    }, [orderItems])

    const handleCheckOut = (): void => {
        const minOrdeAmount: number = outlet?.minOrderValue;
        const itemAmount: number = JSON.parse(orderItems.reduce((a, b) => a + (b.basePrice * b.quantity), 0).toFixed(2));
        if (itemAmount >= minOrdeAmount) {
            navigate("/cart")
        } else {
            const msg: errorState = {
                status: "failure",
                error: "Your order amount is less than minimum order value of selected outlet",
                result: null
            }
            setError(msg)
        }
    }


    const backToOutlet = useCallback((): void => {
        const outletPath: string = "/" + pnr + "/stations/outlets/" + code;
        navigate(outletPath, { replace: true })
    }, [navigate, code, pnr])


    const handleCancel = useCallback((): void => {
        setWarningDialog(false);
    }, [])


    const handleContiue = useCallback((): void => {
        setOrderItems([])
        sessionStorage.removeItem("cartOutlet")
        setWarningDialog(false)
    }, [])


    const applyVegFilter = useCallback((veg: string): void => {
        veg === filters.isVeg
            ? setFilters((prevData): { isVeg: string | null, amountSort: string | null } => ({
                ...prevData,
                isVeg: null
            }))
            : setFilters((prevData): { isVeg: string | null, amountSort: string | null } => ({
                ...prevData,
                isVeg: veg
            }))
    }, [filters])


    const applyPriceFilter = useCallback((value: string): void => {
        value === filters.amountSort
            ? setFilters((prevData): { isVeg: string | null, amountSort: string | null } => ({
                ...prevData,
                amountSort: null
            }))
            : setFilters((prevData): { isVeg: string | null, amountSort: string | null } => ({
                ...prevData,
                amountSort: value
            }))
    }, [filters])


    const VegList: menuInfo[] = filters?.isVeg
        ? menuList.filter(veg => veg.isVegeterian === (filters.isVeg === "veg") ? true : false)
        : menuList;


    const menuItemList: menuInfo[] = filters?.amountSort ?
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
            {error && <ErrorToster props={error} />}
        </>
    )
}
