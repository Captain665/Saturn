import React, { memo, useContext } from "react";
import { FaStar, FaArrowLeft, FaPersonBiking } from "react-icons/fa6";
import { outletData } from "./Menu";


function OutletInfo() {

    const outletDat = useContext(outletData)

    const outletInfo = outletDat.selectedOutletInfo
    const handleOnBack = outletDat.backToOutlet;
   


    console.log("outlet info component mou details is run")


    return (
        <ul className=" md:w-3/4 w-full m-auto md:text-lg">

            <ul className="m-3">
                <li className="text-xl font-thin text-zinc-700">
                    <FaArrowLeft onClick={handleOnBack} className="cursor-pointer" />
                </li>
                <li className="text-2xl font-bold mt-2 md:text-3xl">{outletInfo?.outletName}</li>
            </ul>

            <ul className="m-3 flex flex-col gap-2 md:gap-4 p-3 shadow rounded-xl from-slate-800 border-2 md:relative justify-center max-h-fit">

                <ul className="flex gap-2 justify-start font-bold items-center">
                    <li><FaStar className="text-white bg-green-600 p-1 rounded-full text-xl" /> </li>
                    <li className="font-bold text-lg">{outletInfo?.ratingValue}</li>
                    {outletInfo?.ratingCount &&
                        <li>({outletInfo?.ratingCount}k + ratings)</li>
                    }
                    <li className="text-gray-500 text-xs">•</li>
                    <li> &#x20B9;{outletInfo?.minOrderValue} Min</li>
                </ul>

                <li className=" truncate">{outletInfo?.tags}</li>

                <ul className="flex gap-3">
                    <li className="text-gray-500">•</li>
                    <li className="font-bold">Outlet</li>
                    <li className="text-gray-500">{outletInfo?.stationCode}</li>
                </ul>

                <hr />

                <ul className="flex gap-2 items-center text-gray-600">
                    <li className="text-xl">
                        <FaPersonBiking />
                    </li>
                    {outletInfo?.deliveryCost
                        ? <li>&#x20B9;{outletInfo?.deliveryCost} Delivery fee will apply</li>
                        : <li>Free Delivery</li>}
                </ul>

                <li className="hidden md:block absolute right-2 h-full w-1/4 p-2">
                    <img src={outletInfo?.logoImage} alt="" className="w-full h-full object-center object-cover rounded-lg" />
                </li>

            </ul>
        </ul>
    )
}

export default memo(OutletInfo);
