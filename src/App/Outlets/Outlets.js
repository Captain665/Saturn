import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import OutletHtml from "./OutletList";
import { OutletResponse } from "../ApiCall/OutletApi";

export default function OutletList() {
    const navigate = useNavigate()
    const { code } = useParams()
    const station = JSON.parse(sessionStorage.getItem("selectedStation"))
    const [outletData, setOutletData] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true)
            const response = await OutletResponse(code)
            if (response.status === "success") {
                setOutletData(response.result)
                setIsLoading(() => false)
            }else{
                setIsLoading(() => false)
            }
        }

        fetchData()
        return () => {
            setIsLoading(() => false)
        }
    }, [code])

    const handleOnClick =  (outlet) => {
        const route = "/station/".concat(code) + "/outlet/".concat(outlet.id) + "/menu"
        window.sessionStorage.setItem("outletInfo", JSON.stringify(outlet))
        navigate(route)
    }

    function returnToStation() {
        navigate(-1, {replace : true})
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