import React, { memo } from "react";
import { FaStar, FaChevronRight } from "react-icons/fa6";
import NoProductExist from "../Components/EmptyPage";

function OutletHtml({ outletData, handleOnClick, isLoading }) {

    return (
        <>
            {
                outletData.length > 0
                    ?

                    <div className="w-full">
                        <div className="flex flex-col w-full">
                            <div className="flex w-11/12 md:w-4/5 justify-between md:mt-16 mt-10 self-center items-center md:mb-5">
                                <hr className="flex-grow border-t border-gray-300" />
                                <span className="px-3 md:text-lg text-gray-500">AVAILABLE RESTAURANTS</span>
                                <hr className="flex-grow border-t border-gray-300" />
                            </div>

                            <div className="self-center w-11/12 md:w-4/5 grid md:grid-cols-4 gap-2 md:gap-y-20 gap-y-10 p-1 md:mt-10 mt-5">
                                {outletData?.map(outlet => (
                                    <div
                                        className="flex flex-col bg-white h-72 m-1 cursor-pointer hover:p-2 hover:delay-100"
                                        key={outlet.id}
                                        onClick={() => handleOnClick(outlet)}
                                    >
                                        <ul className="h-3/4">
                                            <img
                                                src={outlet.logoImage}
                                                alt=""
                                                className="object-cover w-full h-full object-center rounded-2xl"
                                            />
                                            {
                                                outlet.deliveryCost === 0
                                                && <li className="z-50 -mt-10 text-white font-extrabold text-center text-4xl">
                                                    Free Delivery
                                                </li>
                                            }
                                        </ul>
                                        <ul className="flex justify-between pt-2">
                                            <ul className="pl-3 w-2/3">
                                                <li className="font-semibold text-lg">{outlet.outletName}</li>
                                                <ul className="flex">
                                                    <li className="bg-green-600 p-1 rounded-full"><FaStar className="text-white" /></li>
                                                    <li className="pl-1 font-semibold">{outlet.ratingValue}</li>
                                                    {
                                                        outlet.ratingCount > 0 &&
                                                        <li className="text-xs pl-0.5 pt-1">
                                                            {`(${outlet.ratingCount}k+)`}
                                                        </li>
                                                    }
                                                </ul>
                                                <li className="text-gray-500 text-sm">{outlet.tags}</li>
                                            </ul>
                                            <ul className="text-gray-600 md:self-center flex flex-col">
                                                <li>Min &#x20B9;{outlet.minOrderValue}</li>
                                                <li className="md:hidden block self-center mt-5 text-lg text-gray-4 00"><FaChevronRight /></li>
                                            </ul>
                                        </ul>
                                    </div>
                                ))}
                            </div><br /><br />
                        </div>
                    </div>
                    :
                    <NoProductExist isLoading={isLoading}/>
        }

        </>
    )
}
export default memo(OutletHtml)