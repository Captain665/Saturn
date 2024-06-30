import React, { useCallback, useEffect, useState } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router";
import OrderInfo from "./OrderInfo";
import { OrderDetailResponse } from "../../ApiCall/OrderInfoAPI";
import { isMobile } from "react-device-detect";
import SuccessPlacedConfirm from "./SuccessMsg";
import IsLoading from "../../Components/Loading";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import ErrorToaster from "../../Components/MessageToggle";
import { GetLocalData } from "../../Components/CustomHooks";
import { errorState, orderDetails } from "../../CommonTypes/CommonType";


export default function OrderDetails() {

    const navigate: NavigateFunction = useNavigate()
    const { orderId }: Readonly<Params<string>> | undefined = useParams()
    const [params, setParams] = useSearchParams();

    const token: string = GetLocalData("userInfo").jwt;

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [order, setOrder] = useState<orderDetails>();
    const [error, setError] = useState<errorState>();
    const [isShown, setIsShown] = useState<boolean>(params.get("type") ? true : false)



    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            setIsLoading(true)
            const response = await OrderDetailResponse(token, orderId)
            const status: string = response.status;
            if (status === "success") {
                setOrder(response.result)
            } else {
                setError(response)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [orderId, token])

    const backToHome = (): void => {
        const path: string = isMobile ? "/orders" : "/account"
        navigate(path)
    }
    const handleOnClick = useCallback((): void => {
        setParams()
        setIsShown(() => false)
    }, [setParams])

    if (isLoading) {
        return <>
            <IsLoading isLoading={isLoading} />

            {/* <Spinner isLoading={isLoading} /> */}
        </>


    }


    return (
        <>
            {order && <OrderInfo
                order={order}
                backToHome={backToHome}
            />}

            {
                isShown &&
                <SuccessPlacedConfirm
                    orderId={order?.id}
                    shown={isShown}
                    handleOnClick={handleOnClick}
                />
            }

            {/* {error && <ErrorToaster props={error} />} */}

        </>
    )
}