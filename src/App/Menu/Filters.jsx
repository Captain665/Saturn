import React from "react";

export default function Filters({ vegFilter, priceFilter, active }) {


    return (
        <div className="flex gap-4 m-2 md:w-4/5 justify-start self-center">
            <button
                onClick={() => vegFilter("veg")}
                className={`rounded border-2 text-sm md:text-lg flex justify-center place-items-center gap-0.5 p-1 px-2 font-thin ${active.isVeg === "veg" ? "bg-green-300 border-none" : null}`}>
                <img src="/veg.png" alt="" width={15} />
                Veg
            </button>
            <button
                onClick={() => vegFilter('nonVeg')}
                className={`rounded border-2 text-sm md:text-lg flex justify-center place-items-center gap-0.5 p-1 font-thin ${active.isVeg === "nonVeg" ? "bg-red-300 border-none" : null}`}>
                <img src="/nonveg.png" alt="" width={15} />
                Non Veg
            </button>
            <button
                onClick={() => priceFilter("hightoLow")}
                className={`rounded border-2 p-1 md:text-lg text-sm ${active.amountSort === "hightoLow" ? " bg-blue-400" : null}`}>High to Low</button>
            <button
                onClick={() => priceFilter("lowtohigh")}
                className={`rounded border-2 p-1 md:text-lg text-sm ${active.amountSort === "lowtohigh" ? " bg-blue-400" : null}`}>Low to High</button>
        </div>
    )
}