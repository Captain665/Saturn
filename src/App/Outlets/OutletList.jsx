import React, { memo } from "react";
import { FaStar,FaChevronRight } from "react-icons/fa6";
import IsLoading from "../../App/Components/Loading";

function OutletHtml({ returnToStation, isLoading, outletData, stations, stationCode, handleOnClick }) {

    return (
        <>
            {isLoading ? <IsLoading /> :
                <div className="flex flex-col mx-1">
                    <div className="flex md:gap-20 self-center justify-between pt-2 w-full">
                        <p className="text-sky-400 hover:font-bold md:text-lg text-sm cursor-pointer underline text-center w-1/3"
                            onClick={returnToStation}>Choose Different Station</p>
                        <div className="w-1/2 text-center">
                            <p className="md:text-xl text-sm">Restaurants at </p>
                            <p className="md:text-2xl text-base font-bold">{stations?.name} <span className="font-thin text-xs md:text-lg">({stationCode})</span></p>
                        </div>
                        <h1 className="text-sm md:text-lg w-1/4 text-center">{outletData?.length} Restaurant Available</h1>
                    </div>

                    <div className="flex flex-col justify-center self-center items-center md:w-11/12 m-2 md:mt-10 w-full bg-white">
                        {outletData?.map(outlet => (
                            <div key={outlet.id}
                                className="shadow-2xl bg-white md:w-2/3 flex m-1 w-full md:h-48 h-28 rounded cursor-pointer"
                                onClick={() => handleOnClick(outlet)}>
                                <div className="rounded-md w-2/5 bg-sky-200 m-2">
                                    <img src={outlet.logoImage} className="w-full h-full object-center" alt="logoImage" />
                                </div>
                                <div className="border-l-2 pl-4 w-11/12 justify-center md:p-3">
                                    <h2 className="md:text-2xl text-lg font-bold pt-2">{outlet.outletName}</h2>
                                    <h2 className="pt-1 md:text-base text-sm">Min order : &#x20B9;{outlet.minOrderValue}</h2>
                                    <div className="flex md:pt-2 md:text-base text-sm">
                                        <span className="text-[#FFD700] items-center"><FaStar /></span>
                                        <span className="pl-2"> {outlet.ratingValue} </span>
                                        <span className="pl-2"> Based on {outlet.ratingCount} Ratings</span>
                                    </div>
                                </div>
                                <div className="self-center mr-2 text-sky-300">
                                    <FaChevronRight />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}
export default memo(OutletHtml)