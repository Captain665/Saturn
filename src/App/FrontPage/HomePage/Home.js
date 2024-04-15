import React, { useCallback, useRef, useState } from "react";
import HomePage from "./Home.html";
import { useNavigate } from "react-router";
import { PnrResponse } from "../../ApiCall/PnrApi";
import Spinner from "../../Components/Spinner";
import ActionDialog from "./PnrDialog"
import ErrorToster from "../../../App/Components/MessageToggle";


export default function Home() {

    const navigate = useNavigate()
    const pnr = useRef("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [dialog, setDialog] = useState(false)

    const GetData = useCallback(async (pnr) => {
        setIsLoading(true)
        const response = await PnrResponse(pnr.current)
        if (response.status === "failure") {
            setError(response)
        }
        if (response.status === "success") {
            const result = response.result;
            sessionStorage.setItem("pnrDetails", JSON.stringify(result))
            sessionStorage.setItem("pnr", JSON.stringify(pnr.current))
            const route = pnr.current + "/stations";
            navigate(route, { state: { result } });

        }
        setIsLoading(false)
    }, [])

    const handleOnChange = (event) => {
        const value = event.target.value
        pnr.current = value
    }

    const showDialog = useCallback(() => {
        setDialog(true);
    }, [])

    const hideDialog = useCallback(() => {
        setDialog(false);
    }, [])


    return (
        <>
            <HomePage
                showDialog={showDialog}
            />

            {dialog &&
                <ActionDialog
                    handleOnChange={(event) => handleOnChange(event)}
                    handleOnClick={() => GetData(pnr)}
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