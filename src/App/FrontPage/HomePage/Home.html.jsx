import React from "react";
import { FaSpinner } from "react-icons/fa6";
import ErrorToster from "../../../MessageToggle";


export default function HomePage({ pnr,handleOnChange, handleOnClick,isLoading,error }) {  



    return (
        <>
            <div className="bg-cover bg-center opacity-90 bg-[url('https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0')] h-svh bg-no-repeat w-full">
                <div className="h-screen flex justify-center items-center flex-col">
                    <div className="w-fit self-center shadow-xl rounded-xl items-center place-content-center bg-gray-200 p-10 flex gap-2">
                        <input type="number" name="pnr" maxLength="10" value={pnr} onChange={handleOnChange}
                            className="border-2 rounded-md h-14 outline-none pl-5 text-xl text-start font-medium w-80" placeholder="Enter PNR Number" /><br />

                        <button type="Submit" onClick={handleOnClick} disabled={isLoading ? true : false}
                            className="bg-rose-800 px-6 p-3 text-white border-none font-bold rounded-lg text-xl cursor-pointer">{isLoading ? <FaSpinner className="animate-spin text-2xl" /> : "Submit"}</button>
                    </div>
                </div>
                {error && <ErrorToster props={error} />}
            </div>
        </>
    )
}