import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router";
import OutletHtml from "./OutletList";
import Spinner from "../Components/Spinner";
import { SetSessionData } from "../Components/CustomHooks";
import { errorState, outletInfo } from "../CommonTypes/CommonType";
import ErrorToster from "../Components/MessageToggle"
import useGetRequest from "../ApiCall/GetRequest";

export default function OutletList() {

    const navigate = useNavigate()
    const { code }: Readonly<Params<string>> = useParams();

    const [outletData, setOutletData] = useState<outletInfo[] | []>([]);
    const [errorMsg, setError] = useState<errorState>();
    const { data, isLoading, error, fetch } = useGetRequest();


    useEffect((): void => {

        fetch(`/outlet/station/${code}`)

    }, [code])

    useEffect(() => {
        if (data) {
            setOutletData(data)
        }
        if (error) {
            setError(error)
        }
    }, [data, error])

    const handleOnClick = (outlet: outletInfo): void => {
        const route = "/station/" + code + "/outlet/" + outlet?.id + "/menu"
        SetSessionData("outletInfo", outlet);
        navigate(route)
    }
    const backToStations = (): void => {
        navigate(-1);
    }


    return (
        <>
            <OutletHtml
                isLoading={isLoading}
                outletData={outletData}
                handleOnClick={handleOnClick}
                back={backToStations}
            />

            <Spinner
                isLoading={isLoading}
            />
            {errorMsg && <ErrorToster props={errorMsg} />}
        </>
    )
}