import React, { memo } from "react";
import { FaTrain, FaChevronLeft } from "react-icons/fa6";
import ErrorToster from "../../MessageToggle";
import IsLoading from "../../Loading";

function TrainHtml({ isLoading, train, error, pnr }) {

    const date = train?.trainInfo.dt
    const [day, month, year] = date.split('-');
    const validFormatDateString = `${year}-${month}-${day}`;

    const original_date = new Date(validFormatDateString) 

    const boardingDate = original_date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    })


    return (
        <div className="flex flex-col">

            {isLoading ? <IsLoading /> : <>

                <div className="flex w-full md:w-3/4 justify-between mt-2 self-center items-center">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="px-3 md:text-lg">TRAIN DETAILS </span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>

                <div className="self-center shadow w-11/12 md:w-3/4 px-2 md:px-10 rounded text-sm md:text-lg bg-opacity-1">

                    <ul className="mt-2 font-semibold border-b-2 border-dashed">
                        <li>PNR: {pnr}</li>
                    </ul>

                    <ul className="flex justify-between mt-2">
                        <li className=" text-gray-400">{train?.trainInfo?.name}</li>
                        <li className=" text-gray-400">Seat No: <span className=" text-black">{train?.seatInfo.coach}/{train?.seatInfo.berth}</span></li>
                    </ul>

                    <ul className="flex justify-between mt-2 w-full">
                        <li>{train?.trainInfo.boarding}</li>
                        <li className="flex items-center w-1/2">
                            <hr className="flex-grow border-t border-sky-300" />
                            <span className="px-3 text-xs"><FaTrain /></span>
                            <hr className="flex-grow border-t border-sky-300" />
                        </li>
                        <li>{train?.trainInfo.destination}</li>
                    </ul>

                    <ul className="flex justify-between mt-2">
                        <li className=" text-gray-400">{boardingDate}</li>
                        <li>{ }</li>
                    </ul>

                </div>
            </>
            }

            {error && <ErrorToster props={error} />}

        </div>
    )

}

export default memo(TrainHtml);