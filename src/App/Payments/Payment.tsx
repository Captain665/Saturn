import React, { useCallback, useEffect, useState } from "react";
import PaymentInfo from "./PaymentInfo";
import { useLocation, useNavigate } from "react-router";
import { CreateOrderResponse } from "../ApiCall/CreateOrderApi";
import { isMobile } from "react-device-detect";
import Spinner from "../Components/Spinner";
import ErrorToster from "../Components/MessageToggle";
import IsLoading from "../Components/Loading";
import { GetLocalData, GetSessionData } from "../Components/CustomHooks";
import { SeatInfo, Station, TrainInfo, orderItems, outletInfo, paymentOptions, userInfo } from "../CommonTypes/CommonType";
import useGetRequest from "../ApiCall/GetRequest";



export default function Payments() {

    const navigate = useNavigate()
    const location = useLocation()
    const path: string = location.pathname;
    const { data, isLoading, error, fetch } = useGetRequest();

    const outletInfo: outletInfo = GetSessionData("outletInfo");
    const stationInfo: Station = GetSessionData("selectedStation");
    const itemInfo: orderItems[] = GetSessionData("selectedItemInfo");
    const userInfo: userInfo = GetLocalData("userInfo");
    const trainInfo: TrainInfo = GetSessionData("pnrDetails")?.trainInfo;
    const seatInfo: SeatInfo = GetSessionData("pnrDetails")?.seatInfo;
    const pnr: number = GetSessionData("pnr");

    const [paymentOption, setPaymentOption] = useState<paymentOptions | undefined>();
    const [paymentSelection, setPaymentSelection] = useState<string>("")


    let subTotal: number = 0;
    itemInfo.forEach(item => subTotal += (item.basePrice * item.quantity));
    const taxes: number = JSON.parse((subTotal * 0.05).toFixed(2))
    const deliveryCharge: number = outletInfo?.deliveryCost;
    const payable: number = Math.round(subTotal + taxes + deliveryCharge)


    const selectPaymentMode = useCallback((mode: string): void => {
        setPaymentSelection((prevData) => (prevData === mode ? "" : mode))
    }, [])

    const backToCart = useCallback((): void => {
        navigate("/cart")
    }, [navigate])

    const device: string = isMobile ? "Mobile Web" : "Desktop Web"

    const createOrder =

        async (): Promise<void> => {
            // setIsLoading(() => true)
            const paymentType: string = paymentSelection === "Pay on Delivery" ? "CASH" : paymentSelection;
            const response = await CreateOrderResponse(trainInfo,
                stationInfo, seatInfo, outletInfo, userInfo, itemInfo, pnr, paymentType, device);
            const status: string = response.status;
            if (status === "success") {
                sessionStorage.clear();
                const orderId: number = response?.result?.id;
                const path: string = "/order/" + orderId + "?type=new"
                navigate(path)
                // setIsLoading(false)
            } else {
                // setError(response)
                // setIsLoading(false)
            }
        }

    if (error) {
        localStorage.clear();
        const pathName: string = `/login?redirectedTo=${path}&message=You must log in first.`
        navigate(pathName)
    }

    useEffect((): void => {

        fetch("/payment/available")

    }, [])

    useEffect(() => {
        if (data) {
            setPaymentOption(data)
        }
    }, [data, error])


    if (isLoading) {
        return <>
            <IsLoading isLoading={isLoading} />

            <Spinner isLoading={isLoading} />
        </>
    }


    return (
        <>
            <PaymentInfo
                paymentMode={selectPaymentMode}
                proceedToPay={createOrder}
                mode={paymentSelection}
                totalAmount={payable}
                backToCart={backToCart}
                isLoading={isLoading}
                totalItem={itemInfo?.length}
                paymentOption={paymentOption}
            />
            {isLoading && <Spinner isLoading={isLoading} />}

            {error && <ErrorToster props={error} />}

        </>
    )
}