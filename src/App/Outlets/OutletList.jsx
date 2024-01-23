import React, { memo } from "react";
import { FaStar, FaSpinner } from "react-icons/fa6";

function OutletHtml({returnToStation, isLoading, outletData, stations, stationCode, handleOnClick }) {

    return (
        <>

            {isLoading ? <h1 className="w-fit m-auto flex items-center h-screen animate-spin text-6xl"><FaSpinner /></h1> : <>
                <div className="flex gap-20 self-center">
                    <p className="t text-rose-400 hover:font-bold text-lg cursor-pointer underline" onClick={returnToStation}>Choose Different Station</p>
                    <h1>Restaurants at <span className="font-bold text-xl">{stations?.name}</span><span className="font-thin"> ({stationCode})</span></h1>
                    <h1>{outletData?.length} Restaurant Available</h1>
                </div>
                <br />
                <div className="flex flex-col justify-center self-center items-center w-11/12">
                    {outletData?.map((outlet) => (
                        <>
                            <div key={outlet.id}
                                className="shadow-lg w-2/3 flex h-48 rounded border-2 cursor-pointer hover:border-4"
                                onClick={() => handleOnClick(outlet)}
                            >
                                <div className="rounded-md w-1/3">
                                    <img src={outlet.logoImage} className="w-full h-full object-center" alt="logoImage" />

                                </div>
                                <div className="border-l-2 pl-4 w-full justify-center p-3">
                                    <h2 className="text-xl font-bold pt-2">{outlet.outletName}</h2>
                                    <h2 className="pt-1">Min order : &#x20B9;{outlet.minOrderValue}</h2>
                                    <div className="flex pt-2">
                                        <span className="text-[#FFD700] items-center"><FaStar /></span>
                                        <span className="pl-2"> {outlet.ratingValue} </span>
                                        <span className="pl-2"> Based on {outlet.ratingCount} Ratings</span>
                                    </div>
                                </div>
                            </div><br />
                        </>
                    ))}
                </div>
            </>}
        </>
    )
}
export default memo(OutletHtml)