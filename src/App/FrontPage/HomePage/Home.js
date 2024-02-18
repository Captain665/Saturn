import React, { useRef, useState } from "react";
import HomePage from "./Home.html";
import { useNavigate } from "react-router";
import { PnrResponse } from "../../ApiCall/PnrApi";



export default function Home() {

    // const [pnr, setPnr] = useState("")
    const pnr = useRef("")

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate()


    // setTimeout(() => {
    //     setError(null)
    // }, 10000)

    function GetData(pnr) {
        const data = async () => {
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
        data()
    }
    console.log(pnr.current)
    function handleOnChange(event) {
        const value = event.target.value
        if(value.length <= 10){
            pnr.current = value
        } 
    }


    return (
        <>
            <HomePage
                // pnr={pnr}
                handleOnChange={(event) => handleOnChange(event)}
                handleOnClick={() => GetData(pnr)}
                isLoading={isLoading}
                error={error}
            />
        </>
    )

}