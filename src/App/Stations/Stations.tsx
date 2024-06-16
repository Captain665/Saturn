import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StationData from "./StationList";
import { PnrDetails } from "./Train";
import { Station, pnrResponseResult } from "../CommonTypes/CommonType";
import { SetSessionData } from "../Components/CustomHooks";

export default function StationList() {

    const navigate = useNavigate();
    const PnrResponse: any = useContext(PnrDetails);

    const [jourenyData] = useState<pnrResponseResult>(PnrResponse)
    const [stations, setStations] = useState<Station[]>(PnrResponse?.stations)

    useEffect(() => {
        const data: Station[] = PnrResponse?.stations;
        setStations(data)
    }, [PnrResponse?.stations])


    const handleOnClick = useCallback((station: Station) => {
        SetSessionData("selectedStation", station);
        navigate("outlets/" + station.code, { state: { jourenyData, station } })
    }, [])

    return (
        <>
            <StationData
                stations={stations}
                handleOnClick={handleOnClick}
            />
        </>
    )
}