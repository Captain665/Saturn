import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import StationData from "./StationList";

export default function StationList() {

    const [train] = useOutletContext()
    const [jourenyData] = useState(train)
    const navigate = useNavigate();
    const [stations] = useState(train?.stations)


    function handleOnClick(station) {
        window.sessionStorage.setItem("selectedStation", JSON.stringify(station))
        navigate(station.code, { state: { jourenyData, station } })
    }

    return (
        <>
            <StationData
                stations={stations}
                handleOnClick={(station) => handleOnClick(station)}
            />
        </>
    )
}