import { createContext, useCallback, useEffect, useState } from "react";
import { Outlet, Params, useNavigate, useParams } from "react-router";
import TrainHtml from "./TrainDetails";
import Spinner from "../Components/Spinner";
import ErrorToster from "../Components/MessageToggle";
import { GetSessionData, SetSessionData } from "../Components/CustomHooks";
import { errorState, pnrResponseResult } from "../CommonTypes/CommonType";
import { GetRequest } from "../ApiCall/AxiosRequest";
import useGetRequest from "../ApiCall/GetRequest";

export const PnrDetails: any = createContext("");

export default function TrainInfo() {

    let { pnr }: Readonly<Params<string>> = useParams();
    const navigate = useNavigate()

    const [train, setTrainData] = useState<pnrResponseResult>(GetSessionData("pnrDetails") ?? []);
    const [errorMsg, setError] = useState<errorState>();
    const { data, isLoading, error, fetch } = useGetRequest();

    useEffect((): void => {

        fetch(`/pnr/${pnr}`)

    }, [pnr])

    useEffect(() => {
        if (data) {
            setTrainData(data)
            SetSessionData("pnrDetails", data)
            SetSessionData("pnr", pnr)
        }
        if (error) {
            setError(error)
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }
    }, [data, error])

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
            {errorMsg && <ErrorToster props={errorMsg} />}
        </>
    )
}
