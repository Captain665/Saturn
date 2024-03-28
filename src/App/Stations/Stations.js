import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StationData from "./StationList";
import { PnrDetails } from "./Train";

export default function StationList() {

    const navigate = useNavigate();
    const PnrResponse = useContext(PnrDetails);

    const [jourenyData] = useState(PnrResponse)
    const [stations, setStations] = useState(PnrResponse?.stations)

    useEffect(() => {
        const data = PnrResponse.stations
        setStations(() => data)
    }, [PnrResponse.stations])


    const handleOnClick = (station) => {
        window.sessionStorage.setItem("selectedStation", JSON.stringify(station))
        navigate("outlets/" + station.code, { state: { jourenyData, station } })
    }

    return (
        <>
            <StationData
                stations={stations}
                handleOnClick={handleOnClick}
            />
        </>
    )
}