import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import OutletHtml from "./OutletList";
import { OutletResponse } from "../ApiCall/OutletApi";

export default function OutletList() {
    const navigate = useNavigate()
    const { code, pnr } = useParams()
    const station = JSON.parse(sessionStorage.getItem("selectedStation"))
    const [outletData, setOutletData] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            const response = await OutletResponse(code)
            if (response.status === "success") {
                setOutletData(response.result)
            }
            setIsLoading(false)
        }
        return () => { fetchData() }
    }, [code])

    function handleOnClick(outlet) {
        const route = "/station/" + code + "/outlet/" + outlet.id + "/menu"
        window.sessionStorage.setItem("outletInfo", JSON.stringify(outlet))
        navigate( route )
    }

    function returnToStation() {
        navigate("/" + pnr + "/outlets")
    }


    return (
        <>
            <OutletHtml
                isLoading={isLoading}
                outletData={outletData}
                stations={station}
                stationCode={code}
                returnToStation={() => returnToStation()}
                handleOnClick={(outlet) => handleOnClick(outlet)}
            />
        </>

    )
}