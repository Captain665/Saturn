import React, { useCallback, useRef, useState } from "react";
import HomePage from "./Home.html";
import { useNavigate } from "react-router";
import Spinner from "../../Components/Spinner";
import ActionDialog from "./PnrDialog"
import { errorState, pnrResponseResult } from "../../CommonTypes/CommonType"
import { SetSessionData } from "../../Components/CustomHooks"
import { GetRequest } from "../../ApiCall/ApiCall";
import ErrorToster from "../../Components/MessageToggle";


export default function Home() {

    const navigate = useNavigate();
    const [pnr, setPnr] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dialog, setDialog] = useState<boolean>(false);
    const [error, setError] = useState<errorState>()

    const GetData = useCallback(async (pnr: string): Promise<void> => {
        setIsLoading(true)
        if (pnr === '') {
            const errorMessage: errorState = {
                status: 400,
                error: "Please Enter PNR Number",
                result: null
            }
            setError(errorMessage)
        } else {
            const response = await GetRequest(`/pnr/${pnr}`);

            if (response.status != 200) {
                const errorMessage: errorState = {
                    status: response.status,
                    error: response.data.error,
                    result: null
                }
                setError(errorMessage);
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
            {error && <ErrorToster props={error} />}

        </>

    )

}