import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import OutletHtml from "./OutletList";
import { OutletResponse } from "../ApiCall/OutletApi";
import Spinner from "../Components/Spinner";

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
            } else {
                setIsLoading(() => false)
            }
        }

        fetchData()
        return () => {
            setIsLoading(() => false)
        }
    }, [code])

    const handleOnClick = (outlet) => {
        const route = "/station/".concat(code) + "/outlet/".concat(outlet.id) + "/menu"
        window.sessionStorage.setItem("outletInfo", JSON.stringify(outlet))
        navigate(route)
    }


    return (
        <>
            <OutletHtml
                isLoading={isLoading}
                outletData={outletData}
                stations={station}
                stationCode={code}
                handleOnClick={handleOnClick}
            />
            <Spinner
                isLoading={isLoading}
            />
        </>

    )
}