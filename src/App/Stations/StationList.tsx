import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FormatedDate, FormatedTime } from "../Components/DateTimeFormatChange";
import { memo } from "react";
import { Station } from "../CommonTypes/CommonType";

export function TrainTiming(value: string): string {

    const delayTime: number = JSON.parse(value)
    return delayTime === 0 ? "On Time" : "Late by " + value + " mins"
}

export function StationCheck(halt: string, arr: string, dep: string): string {
    if (halt === "--" && arr === "--") {
        return "Starting station"
    } else if (halt === "--" && dep === "--") {
        return "Last station"
    } else {
        return halt + " mins halt"
    }
}


function StationData({ stations, handleOnClick }: { stations: Station[], handleOnClick: any }) {

    const stationClicked = (station: Station) => {
        if (station.serviceable) {
            return handleOnClick(station)
        } else {
            return null;
        }
    }

    return (
        <><div className="flex flex-col w-full">

            <div className="flex w-11/12 md:w-1/2 justify-between mt-16 self-center items-center mb-5">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-3 md:text-lg text-gray-500">AVAILABLE STATIONS</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>

            {stations?.map(station => (
                <div className={`shadow-lg w-11/12 md:w-1/2 content-center self-center h-28 px-4 bg-white border m-1 rounded-md md:h-36 cursor-pointer`}>
                    <ul key={station?.code} onClick={() => stationClicked(station)}
                        className={`flex justify-between md:mb-4 mb-3 ${!station.serviceable ? "opacity-60" : null}`}>
                        <ul className="self-center text-start text-sm md:text-base">
                            <li className="font-bold text-base md:text-xl">{station?.name}<span className="ml-1 font-normal text-xs md:text-base">{station?.code}</span></li>
                            <li>{TrainTiming(station?.delayArrival)}</li>
                            <li>{StationCheck(station?.halt, station?.arrival, station?.departure)}</li>
                        </ul>
                        <ul className="flex text-base md:text-xl">
                            <ul className="self-center text-center">
                                <li
                                    className={`font-bold ${JSON.parse(station?.delayArrival) > 0 ? "text-red-500" : "text-green-600"}`}>
                                    {station?.departure === "--" ? FormatedTime(station?.arrival) : FormatedTime(station?.departure)}
                                </li>
                                <li className="text-xs md:text-base">{FormatedDate(station?.depDate)}</li>
                            </ul>
                            <ul className="self-center text-center text-gray-400 pl-2">
                                {!station.message && <li><FaChevronRight /></li>}
                            </ul>
                        </ul>
                    </ul>
                    {station.message && <p className="text-center text-xs md:-mb-5 -mb-3 content-end self-end align-bottom text-red-600 line-clamp-1">
                        {station.message}
                    </p>}
                </div>  
            ))}
        </div>
            <br />
        </>
    )
}

export default memo(StationData);