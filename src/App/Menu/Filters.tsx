import React, { memo } from "react";

function Filters({ vegFilter, priceFilter, active }:
    {
        vegFilter: any;
        priceFilter: any;
        active: { isVeg: string | null, amountSort: string| null }
    }) {

    return (
        <div className="flex flex-col">
            <div className="flex md:gap-4 md:m-5 m-2 md:justify-start justify-between self-center md:w-3/4 md:ml-14 w-full px-4">
                <button
                    onClick={() => vegFilter("veg")}
                    className={`rounded border-2 text-sm md:text-lg flex justify-center place-items-center gap-0.5 p-1 px-2 font-thin ${active.isVeg === "veg" ? "bg-[#388E3C] text-white" : null}`}>
                    <img src="/veg.png" alt="" width={15} className="bg-white" />
                    Veg
                </button>
                <button
                    onClick={() => vegFilter('nonVeg')}
                    className={`rounded border-2 text-sm md:text-lg flex justify-center place-items-center gap-0.5 p-1 font-thin ${active.isVeg === "nonVeg" ? "bg-[#BF360C] text-white" : null}`}>
                    <img src="/nonveg.png" alt="" width={15} className="bg-white" />
                    Non Veg
                </button>
                <button
                    onClick={() => priceFilter("hightoLow")}
                    className={`rounded border-2 p-1 md:text-lg text-sm ${active.amountSort === "hightoLow" ? " bg-slate-700 text-white" : null}`}>High to Low</button>
                <button
                    onClick={() => priceFilter("lowtohigh")}
                    className={`rounded border-2 p-1 md:text-lg text-sm ${active.amountSort === "lowtohigh" ? " bg-slate-700 text-white" : null}`}>Low to High</button>
            </div>
        </div>
    )
}

export default memo(Filters);