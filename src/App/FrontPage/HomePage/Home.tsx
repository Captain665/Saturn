import React, { useCallback, useRef, useState } from "react";
import HomePage from "./Home.html";
import { useNavigate } from "react-router";
import { PnrResponse } from "../../ApiCall/PnrApi";
import Spinner from "../../Components/Spinner";
import ActionDialog from "./PnrDialog"
import ErrorToster from "../../Components/MessageToggle";
import { errorState, pnrResponseResult } from "../../CommonTypes/CommonType"
import { SetSessionData } from "../../Components/CustomHooks"
import { useSearchParams } from "react-router-dom";
import { GetRequest, PostRequest } from "../../ApiCall/ApiCall";


export default function Home() {

    const navigate = useNavigate();
    const [searchParam, setSearchParam] = useSearchParams();
    const [pnr, setPnr] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dialog, setDialog] = useState<boolean>(false);

    const GetData = useCallback(async (pnr: string): Promise<void> => {
        setIsLoading(true)
        if (pnr === '') {
            setSearchParam(param => {
                param.set("error", "Please Enter PNR Number");
                param.set("status", "400")
                return param;
            })
        } else {
            const response = await GetRequest(`/pnr/${pnr}`);
            if (response.status != 200) {
                setSearchParam(param => {
                    param.set("error", response.data.error);
                    param.set("status", response.status)
                    return param;
                })
            } else {
                const result: pnrResponseResult = response?.data.result;
                SetSessionData("pnrDetails", result);
                SetSessionData("pnr", pnr);
                const route: string = pnr + "/stations";
                navigate(route, { state: { result } });
            }
        }
        setIsLoading(false)
    }, [])

    const handleOnChange = (event: any): void => {
        const value: string = event.target.value
        setPnr(value);
    }

    const showDialog = useCallback((): void => {
        setDialog(true);
    }, [])

    const hideDialog = useCallback((): void => {
        setDialog(false);
    }, [])


    return (
        <>
            <HomePage
                showDialog={showDialog}
            />

            {dialog &&
                <ActionDialog
                    handleOnChange={(event: any) => handleOnChange(event)}
                    handleOnClick={() => GetData(pnr)}
                    isLoading={isLoading}
                    dialog={dialog}
                    hideDialog={hideDialog}
                />}

            <Spinner
                isLoading={isLoading}
            />
        </>
    )

}