import React, { createContext, useCallback, useEffect, useState } from "react";
import { Outlet, Params, useNavigate, useParams } from "react-router";
import TrainHtml from "./TrainDetails";
import { PnrResponse } from "../ApiCall/PnrApi";
import Spinner from "../Components/Spinner";
import ErrorToster from "../Components/MessageToggle";
import { GetSessionData, SetSessionData } from "../Components/CustomHooks";
import { errorState, pnrResponseResult } from "../CommonTypes/CommonType";

export const PnrDetails: any = createContext("");

export default function TrainInfo() {

    let { pnr }: Readonly<Params<string>> = useParams();
    const navigate = useNavigate()

    const [train, setTrainData] = useState<pnrResponseResult>(GetSessionData("pnrDetails") ?? []);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<errorState>();
    const [redirected, setRedirected] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setIsLoading(true)
            const response = await PnrResponse(pnr);    
            if (response.status === "failure") {
                setError(response);
                setTimeout((): void => {
                    setRedirected(true)
                    setIsLoading(false)
                }, 4000)
            }
            if (response.status === "success") {
                setTrainData(response?.result);
                setIsLoading(false)
                updatePnrDetails(response?.result)
            }
        }
        fetchData();
    }, [pnr])

    const updatePnrDetails = useCallback((train: pnrResponseResult): void => {
        SetSessionData("pnrDetails", train)
    }, [])

    if (redirected) {
        navigate("/")
    }

    return (
        <>
            <TrainHtml
                train={train}
                pnr={pnr}
            />
            <PnrDetails.Provider value={train}>
                <Outlet />
            </PnrDetails.Provider>

            <Spinner
                isLoading={isLoading}
            />
            {error && <ErrorToster props={error} />}
        </>
    )
}
