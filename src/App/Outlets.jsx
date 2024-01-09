import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { FaStar } from "react-icons/fa6";

export default function OutletList() {
    const { state } = useLocation()
    const { station } = state
    const {trainInfo} = state;
    const { code } = useParams()
    const navigate = useNavigate()
    const [outletData, setOutletData] = useState([])
    const userInfo = localStorage.getItem("userInfo")
    const token = JSON.parse(userInfo).jwt


    useEffect(() => {
        const fetchData = async function fetchOutletData() {
            const requestBody = {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            }
            const url = "/outlet/station/" + code
            const response = await fetch(url, requestBody)
            const jsonData = await response.json()
            setOutletData(jsonData.result)
        }
        return () => fetchData()
    }, [code,token])

    function handleOnClick(outlet){
        const route = "/station/"+code+"/outlet/"+outlet.id+"/menu"
        navigate(route,{state:{station,trainInfo,outlet}})
    }


    const outletDetails = outletData.map((outlet) => (
        <>
            <div key={outlet.id} 
            className="shadow-lg w-2/3 flex h-40 rounded border-2 
             hover:opacity-60 cursor-pointer" 
            onClick={() => handleOnClick(outlet)}
            >
                <div className="rounded-md w-1/3">
                    <img src={outlet.logoImage} className="w-full h-full object-center" alt="logoImage" />
    
                </div>
                <div className="border-l-2 pl-4 w-full justify-center p-3">
                    <h2 className="text-xl font-bold pt-2">{outlet.outletName}</h2>
                    <h2 className="pt-1">Min order {outlet.minOrderValue}</h2>
                    <div className="flex pt-2">
                        <span className="text-[#FFD700] items-center"><FaStar /></span>
                        <span className="pl-2"> {outlet.ratingValue} </span>
                        <span className="pl-2"> Based on {outlet.ratingCount} Ratings</span>
                    </div>
                </div>
            </div><br />
        </>
    ))


    return (
        <div className="flex flex-col justify-center self-center items-center w-11/12">
            <h1>Restaurants at <span className="font-bold text-xl">{station.name}</span><span className="font-thin"> ({code})</span></h1>
            <h1>Showing {outletData.length} Restaurant</h1>
            <br />
            {outletDetails}
        </div>
    )
}