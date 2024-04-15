import React, { createContext, useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import TrainHtml from "./TrainDetails";
import { PnrResponse } from "../ApiCall/PnrApi";
import Spinner from "../Components/Spinner";
import ErrorToster from "../../App/Components/MessageToggle";

export const PnrDetails = createContext();

export default function TrainInfo() {
    
    let { pnr } = useParams();
    const navigate = useNavigate()

    const [train, setTrainData] = useState(JSON.parse(sessionStorage.getItem("pnrDetails")) ?? []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [redirected, setRedirected] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await PnrResponse(pnr);
            if (response.status === "failure") {
                setError(response);
                setTimeout(() => {
                    setRedirected(true)
                    setIsLoading(false)
                }, 4000)
            }
            if (response.status === "success") {
                setTrainData(response.result);
                setIsLoading(false)
                updatePnrDetails(response.result)
            }
        }
        fetchData();
    }, [pnr])

    const updatePnrDetails = useCallback((train) => {
        sessionStorage.setItem("pnrDetails", JSON.stringify(train))
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
