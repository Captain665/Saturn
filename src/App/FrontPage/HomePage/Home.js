import React, { useRef, useState } from "react";
import HomePage from "./Home.html";
import { useNavigate } from "react-router";
import { PnrResponse } from "../../ApiCall/PnrApi";
import Spinner from "../../Components/Spinner";



export default function Home() {

    const navigate = useNavigate()
    const pnr = useRef("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const GetData = async (pnr) => {
        setIsLoading(() => true)
        const response = await PnrResponse(pnr.current)
        if (response.status === "failure") {
            setError(() => response)
        }
        if (response.status === "success") {
            const result = response.result;
            sessionStorage.setItem("pnrDetails", JSON.stringify(result))
            sessionStorage.setItem("pnr", JSON.stringify(pnr.current))
            const route = pnr.current + "/stations";
            navigate(route, { state: { result } });

        }
        setIsLoading(() => false)
        
    }

    function handleOnChange(event) {
        const value = event.target.value
        if (value.length <= 10) {
            pnr.current = value
        }
    }
    console.log("Home page");
    return (
        <>
            <HomePage
                handleOnChange={(event) => handleOnChange(event)}
                handleOnClick={() => GetData(pnr)}
                error={error}
                isLoading={isLoading}
            />
            <Spinner
                isLoading={isLoading}
            />


        </>
    )

}