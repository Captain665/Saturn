import React from "react";
import { useNavigate } from "react-router";
import { FaSpinner } from "react-icons/fa6";

export default function Home() {
    const [pnr, setPnr] = React.useState("")
    const [context, setContext] = React.useState({ error: "", isLoading: false })
    const pnrLength = pnr.length;
    const navigate = useNavigate()

    const fetchData = async () => {
        if (pnrLength === 10) {
            setContext((prevData) => ({
                ...prevData,
                isLoading: true
            }))
            const requestBody = {
                method: "GET"
            }
            const url = "pnr/" + pnr
            const response = await fetch(url, requestBody);
            const jsonData = await response.json();
            if (response.ok) {
                const station = jsonData.result.stations;
                if (station.length > 0) {
                    setContext((prevData) => ({
                        ...prevData,
                        isLoading: false,
                    }))
                    const route = pnr + "/outlets";
                    const result = jsonData.result;
                    window.sessionStorage.setItem("pnr",JSON.stringify(pnr))
                    window.sessionStorage.setItem("pnrDetails",JSON.stringify(result))
                    navigate(route, { state: { result } });
                } else {
                    setContext((prevData) => ({
                        ...prevData,
                        isLoading: false,
                        error: "Sorry, no restaurant found on your journey"
                    }))
                }
            } else {
                setContext((prevData) => ({
                    ...prevData,
                    isLoading: false,
                    error: "Something went wrong, Please try after some time"
                }))
            }
        } else {
            setContext((prevData) => ({
                ...prevData,
                error: "Only 10 digit number are acceptable",
                isLoading: false
            }))
        }
    }

    return (
        <>
            <div className="bg-cover bg-center opacity-90 bg-[url('https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0')] h-svh bg-no-repeat w-full">
                <div className="h-screen flex justify-center items-center flex-col">
                    <div className="w-fit self-center shadow-xl rounded-xl items-center place-content-center bg-rose-300 p-10 flex gap-2">
                    <input type="number" name="pnr" value={pnr} onChange={(event) => ([setPnr(event.target.value), setContext((prevData) => ({ ...prevData, error: "" }))])}
                        className="border-2 rounded-md h-14 outline-none pl-5 text-xl text-start font-medium w-80" placeholder="Enter PNR Number" /><br />

                    <button type="Submit" onClick={() => (fetchData())} disabled={context.isLoading ? true : false}
                        className="bg-blue-800 px-6 p-3 text-white border-none font-bold rounded-lg text-xl cursor-pointer">{context.isLoading ? <FaSpinner className="animate-spin text-2xl" /> : "Submit"}</button>
                    </div>
                </div>
                {context.error && <h1 className="font-bold text-xl bg-white">{context.error}</h1>}
            </div>
        </>
    )
}