import React, { memo } from "react";
import { FaTrain } from "react-icons/fa6";
import ErrorToster from "../../MessageToggle";
import IsLoading from "../../Loading";

function TrainHtml({ isLoading, train, error }) {

    return (
        <div className="flex flex-col">
            {isLoading ? <IsLoading /> : <>
                <h1 className="md:text-4xl text-xl font-bold text-center md:pt-3 pt-1">Journey Details & Station List</h1>
                <div className="flex flex-col md:justify-center self-center items-center md:w-11/12 shadow rounded-md bg-rose-100 m-1 py-5 p-2">

                    <div className="md:p-4 rounded-lg w-full md:px-28 place-items-center p-1">
                        <ul className="item-center grid grid-cols-2 md:gap-3">
                            <li className="inline-flex md:text-xl md:gap-2 place-items-center justify-around md:justify-stretch truncate"><span><FaTrain /></span>
                                <span className="font-bold md:text-2xl md:pl-4 px-1 test-xs">{train?.trainInfo?.trainNo}</span> -
                                <span className="font-thin text-xs md:text-xl pl-1">{train?.trainInfo?.name}</span></li>
                            <li className="inline-flex flex-row-reverse md:text-xl">On {train?.trainInfo?.dt}</li>
                            <li className="font-thin md:text-lg md:pl-14 pl-5 text-sm">{train?.trainInfo?.boarding} onwords</li>
                        </ul>
                    </div>
                </div>
            </>
            }
            {error && <ErrorToster props={error} />}
        </div>
    )

}

export default memo(TrainHtml);