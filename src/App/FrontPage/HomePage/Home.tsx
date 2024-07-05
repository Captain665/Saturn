import { useCallback, useEffect, useState } from "react";
import HomePage from "./Home.html";
import { useNavigate } from "react-router";
import Spinner from "../../Components/Spinner";
import ActionDialog from "./PnrDialog"
import { errorState, pnrResponseResult } from "../../CommonTypes/CommonType"
import { SetSessionData } from "../../Components/CustomHooks"
import { GetRequest } from "../../ApiCall/AxiosRequest";
import ErrorToster from "../../Components/MessageToggle";
import useGetRequest from "../../ApiCall/GetRequest";


export default function Home() {

    const navigate = useNavigate();
    const [pnr, setPnr] = useState<string>('');
    const [dialog, setDialog] = useState<boolean>(false);
    const [errorMsg, setError] = useState<errorState>()
    const { data, isLoading, error, fetch } = useGetRequest();

    const GetData = useCallback((pnr: string) => {

        if (pnr !== '') {
            fetch(`/pnr/${pnr}`);
        } else {
            const errorMessage = {
                status: 400,
                error: "Please Enter PNR Number",
                result: null
            }
            setError(errorMessage)
        }
    }, [])

    useEffect(() => {

        if (data) {
            SetSessionData("pnrDetails", data);
            SetSessionData("pnr", pnr);
            const route: string = pnr + "/stations";
            navigate(route, { state: { data } });
        }

        if (error) {
            setError(error)
        }

    }, [data, error])

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
            {errorMsg && <ErrorToster props={errorMsg} />}

        </>

    )

}