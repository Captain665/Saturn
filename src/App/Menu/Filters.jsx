import React from "react";

export default function Filters({ vegFilter, priceFilter, active }) {


    return (
        <div className="flex gap-5 m-2 md:w-4/5 justify-start self-center">
            <button
                onClick={() => vegFilter("veg")}
                className={`rounded-lg border-2 text-sm md:text-lg flex justify-center place-items-center gap-0.5 p-1 font-thin ${active === "veg" ? "bg-green-200 border-none" : null}`}>
                <img src="/veg.png" alt="" width={15} />
                Veg
            </button>
            <button
                onClick={() => vegFilter('nonVeg')}
                className={`rounded-lg border-2 text-sm md:text-lg flex justify-center place-items-center gap-0.5 p-1 font-thin ${active === "nonVeg" ? "bg-red-200 border-none" : null}`}>
                <img src="/nonveg.png" alt="" width={15} />
                Non Veg
            </button>
            <button
                onClick={() => priceFilter("hightoLow")}
                className="rounded-lg border-2 p-1 md:text-lg text-sm">High to Low</button>
            <button
                onClick={() => priceFilter("lowtohigh")}
                className="rounded-lg border-2 p-1 text-sm md:text-lg">Low to High</button>
        </div>
    )
}