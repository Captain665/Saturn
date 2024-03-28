import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StationData from "./StationList";
import { PnrDetails } from "./Train";

export default function StationList() {

    const PnrResponse = useContext(PnrDetails);
    console.log(PnrResponse)
    const [jourenyData] = useState(PnrResponse)
    const navigate = useNavigate();
    const [stations, setStations] = useState(PnrResponse?.stations)

    useEffect(() => {
        const data =  PnrResponse.stations    
        setStations(() => data)
    },[PnrResponse.stations])


    function handleOnClick(station) {
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