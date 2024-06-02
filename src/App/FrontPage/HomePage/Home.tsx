import React, { useCallback, useRef, useState } from "react";
import HomePage from "./Home.html";
import { useNavigate } from "react-router";
import { PnrResponse } from "../../ApiCall/PnrApi";
import Spinner from "../../Components/Spinner";
import ActionDialog from "./PnrDialog"
import ErrorToster from "../../Components/MessageToggle";
import { errorState, pnrResponseResult } from "../../CommonTypes/CommonType"
import { SetSessionData } from "../../Components/CustomHooks"


export default function Home() {

    const navigate = useNavigate();
    const pnr = useRef<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<errorState>();
    const [dialog, setDialog] = useState<boolean>(false);

    const GetData = useCallback(async (pnr: string): Promise<void> => {
        if (pnr === '') {
            setError({
                status: "failure",
                error: "Please Enter PNR Number",
                result: null
            })
        }
        if (pnr !== '') {
            setIsLoading(true)
            const response = await PnrResponse(pnr)
            const status: string = response.status;
            if (status === "failure") {
                const responseData: errorState = response;
                setError(responseData)
            }
            if (status === "success") {
                const result: pnrResponseResult = response.result;
                SetSessionData("pnrDetails", result);
                SetSessionData("pnr", pnr);
                const route: string = pnr + "/stations";
                navigate(route, { state: { result } });

            }
            setIsLoading(false)
        }
    }, [])

    const handleOnChange = (event: any): void => {
        const value: string = event.target.value
        pnr.current = value
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
                    handleOnClick={() => GetData(pnr.current)}
                    isLoading={isLoading}
                    dialog={dialog}
                    hideDialog={hideDialog}
                />}

            <Spinner
                isLoading={isLoading}
            />

            {error &&
                <ErrorToster
                    props={error}
                />}

        </>
    )

}