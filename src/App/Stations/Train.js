import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import TrainHtml from "./TrainDetails";
import { PnrResponse } from "../ApiCall/PnrApi";


export default function TrainInfo() {

    const navigate = useNavigate()
    const result = JSON.parse(window.sessionStorage.getItem("pnrDetails"))
    // var pnrRes = []
    // if (result !== null || result !== undefined) {
    //     pnrRes = result
    // }
    const [train, setTrainData] = useState(result ? result : []);
    let { pnr } = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);


    useEffect(() => {
        console.log("mounting..")
        const data = async () => {
            setIsLoading(false)
            const response = await PnrResponse(pnr)
            if (response.status === "failure") {
                setError(() => response)
                setTimeout(() => {
                    setIsLoading(() => false)
                    navigate("/")
                }, 4000)
            }
            if (response.status === "success") {
                setTrainData(response.result)
                setIsLoading(() => false)
            }
        }
        data()

        return () => {
            console.log("unmount..")
            setIsLoading(() => false)
        }
    }, [pnr, navigate])

    useEffect(() => {

        window.sessionStorage.setItem("pnrDetails", JSON.stringify(train))

    }, [train])


    return (
        <>
            <TrainHtml
                isLoading={isLoading}
                train={train}
                error={error}
            />
            <Outlet context={[train]} />
        </>
    )
}