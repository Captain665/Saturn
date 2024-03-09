import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import TrainHtml from "./TrainDetails";
import { PnrResponse } from "../ApiCall/PnrApi";
import IsLoading from "../Components/Loading";


export default function TrainInfo() {

    const navigate = useNavigate()
    const result = JSON.parse(window.sessionStorage.getItem("pnrDetails"))

    const [train, setTrainData] = useState(result ? result : []);
    let { pnr } = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);


    useEffect(() => {
        const data = async () => {
            setIsLoading(() => true)
            const response = await PnrResponse(pnr)
            if (response.status === "failure") {
                setError(() => response)
                setTimeout(() => {
                    setIsLoading(() => false)
                    navigate("/")
                }, 4000)
            }
            if (response.status === "success") {
                setTrainData(() => response.result)
                setIsLoading(() => false)
            }
        }
        data()

        return () => {
            setIsLoading(() => false)
        }
    }, [pnr, navigate])

    useEffect(() => {
        
        window.sessionStorage.setItem("pnrDetails", JSON.stringify(train))

    }, [train])

    if(isLoading){
        return <IsLoading />
    }



    return (
        <>
            <TrainHtml
                isLoading={isLoading}
                train={train}
                error={error}
                pnr = {pnr}
            />
            <Outlet context={[train]} />
        </>
    )
}