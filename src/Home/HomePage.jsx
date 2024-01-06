import React from "react";
import { useNavigate } from "react-router";

export default function Home() {
    const [pnr, setPnr] = React.useState("")
    const [context, setContext] = React.useState({error : "", isLoading : false})
    const pnrLength = pnr.length;
    const navigate = useNavigate()

    const fetchData = async function pnrData(){
        if(pnrLength === 10){
            setContext((prevData) => ({
                ...prevData,
                isLoading : true
            }))
            const requestBody = {
                method : "GET"
            }
            const url = "pnr/" + pnr
            const response = await fetch(url,requestBody)
            const jsonData = await response.json()
            if(response.ok){
                const result = jsonData.result.stations
                if(result.length > 0){
                    setContext((prevData) => ({
                        ...prevData,
                        isLoading : false,
                    }))
                    const data = jsonData.result;
                    navigate(pnr + "/outlets", {state:{data}})
                } else{
                    setContext((prevData) => ({
                        ...prevData,
                        isLoading : false,
                        error : "Sorry, no restaurant found on your journey"
                    }))
                }
            }else{
                setContext((prevData) => ({
                    ...prevData,
                    isLoading : false,
                    error : "Something went wrong, Please try after some time"
                }))
            }
        }else{
            setContext((prevData) => ({
                ...prevData,
                error : "Only 10 digit number are acceptable"
            }))
        }
    }

    return (
        <>
            <div className="bg-cover bg-center bg-[url('https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0')] h-svh bg-no-repeat w-full">
                <div className="h-screen flex justify-center items-center flex-col">
                {context.error && <h1 className="font-bold text-white text-xl">{context.error}</h1>}
                    <input type="number" name="pnr" value={pnr} onChange={(event) => ([setPnr(event.target.value), setContext((prevData) => ({...prevData, error : ""}))])}
                    className="border-2 rounded-md h-14 outline-none w-2/7 pl-5 text-xl text-start font-medium" placeholder="Enter PNR Number"/><br />

                    <button type="Submit" onClick={fetchData} disabled={context.isLoading ? true : false}
                    className="bg-blue-800 p-2 text-white border-none font-bold w-1/12 rounded-lg text-xl cursor-pointer">{context.isLoading ? "Loading..." : "Submit"}</button>
                </div>
            </div>
        </>
    )
}