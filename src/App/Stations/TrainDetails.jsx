import React, { memo } from "react";
import { FaTrain, FaSpinner } from "react-icons/fa6";
import ErrorToster from "../../MessageToggle";

function TrainHtml({ isLoading, train, error }) {

    return (
        <>
            {isLoading ? <h1 className="text-6xl h-screen m-auto w-fit items-center flex animate-spin"><FaSpinner /></h1> : <>
                <h1 className="text-4xl font-bold text-center pt-3">Journey Details & Station List</h1>
                <div className="flex flex-col justify-center self-center items-center w-11/12 shadow rounded-md bg-rose-200"><br />

                    <div className="p-4 rounded-lg w-full px-28  place-items-center">
                        <ul className="item-center grid grid-cols-2 gap-3">
                            <li className="inline-flex text-xl gap-2"><span><FaTrain /></span>
                                <span className="font-bold text-2xl pl-4">{train?.trainInfo.trainNo}</span> -
                                <span className="font-thin">{train?.trainInfo.name}</span></li>
                            <li className="inline-flex flex-row-reverse text-xl">On {train?.trainInfo.dt}</li>
                            <li className="font-thin text-lg pl-14">{train?.trainInfo.boarding} onwords</li>
                        </ul>
                    </div>
                </div>
                <br />
            </>
            }
            {error && <ErrorToster props={error} />}
        </>
    )

}

export default memo(TrainHtml);