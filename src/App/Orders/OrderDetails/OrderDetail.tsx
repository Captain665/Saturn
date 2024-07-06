import React, { useCallback, useEffect, useState } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router";
import OrderInfo from "./OrderInfo";
import { isMobile } from "react-device-detect";
import SuccessPlacedConfirm from "./SuccessMsg";
import IsLoading from "../../Components/Loading";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import ErrorToaster from "../../Components/MessageToggle";
import { orderDetails } from "../../CommonTypes/CommonType";
import useGetRequest from "../../ApiCall/GetRequest";
import NoProductExist from "../../Components/EmptyPage";


export default function OrderDetails() {

    const navigate: NavigateFunction = useNavigate()
    const { orderId }: Readonly<Params<string>> | undefined = useParams()
    const [params, setParams] = useSearchParams();

    const { data, isLoading, error, fetch } = useGetRequest();

    const [order, setOrder] = useState<orderDetails>();
    const [isShown, setIsShown] = useState<boolean>(params.get("type") ? true : false)



    useEffect((): void => {
        fetch(`/order/${orderId}`)
    }, [orderId])

    useEffect(() => {
        if (data) {
            setOrder(data)
        }
    }, [data])

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

            <Spinner isLoading={isLoading} />
        </>
    }

    if (error) {
        return <NoProductExist isLoading={isLoading} logo={null} />
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

            {error && <ErrorToaster props={error} />}

        </>
    )
}