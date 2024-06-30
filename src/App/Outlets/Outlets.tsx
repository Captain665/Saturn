import React, { useCallback, useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router";
import OutletHtml from "./OutletList";
import { OutletResponse } from "../ApiCall/OutletApi";
import Spinner from "../Components/Spinner";
import { SetSessionData } from "../Components/CustomHooks";
import { errorState, outletInfo } from "../CommonTypes/CommonType";
import ErrorToster from "../Components/MessageToggle"

export default function OutletList() {

    const navigate = useNavigate()
    const { code }: Readonly<Params<string>> = useParams()

    const [outletData, setOutletData] = useState<outletInfo[] | []>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<errorState>();


    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            setIsLoading(true)
            const response = await OutletResponse(code)
            const status: string = response.status;
            if (status === "success") {
                setOutletData(response?.result)
                setIsLoading(false)
            } else {
                setError(response)
                setIsLoading(false)
            }
        }
        fetchData()
    }, [code])

    const handleOnClick = (outlet: outletInfo): void => {
        const route = "/station/" + code + "/outlet/" + outlet?.id + "/menu"
        SetSessionData("outletInfo", outlet);
        navigate(route)
    }


    return (
        <>
            <OutletHtml
                isLoading={isLoading}
                outletData={outletData}
                handleOnClick={handleOnClick}
            />

            {/* <Spinner
                isLoading={isLoading}
            /> */}
            {/* {error && <ErrorToster props={error} />} */}


        </>
    )
}