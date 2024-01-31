import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import Filters from "./Filters";
import IsLoading from "../../Loading";

export default function MenuList({ menuList, isLoading, orderItems, addItem, removeItem }) {
    const [itemFilter, setItemFilter] = useState({ isVeg: null, amountSort: null })

    function applyVegFilter(veg) {
        veg === itemFilter.isVeg
            ? setItemFilter(prevData => ({
                ...prevData,
                isVeg: null
            }))
            : setItemFilter(prevData => ({
                ...prevData,
                isVeg: veg
            }))
    }

    function applyPriceFilter(value) {
        value === itemFilter.amountSort
            ? setItemFilter(prevData => ({
                ...prevData,
                amountSort: null
            }))
            : setItemFilter(prevData => ({
                ...prevData,
                amountSort: value
            }))
    }


    const VegList = itemFilter?.isVeg
        ? menuList.filter(veg => veg.isVegeterian === (itemFilter.isVeg === "veg") ? true : false)
        : menuList;

    const menuItemList = itemFilter?.amountSort ?
        (itemFilter.amountSort === "hightoLow" ?
            VegList.toSorted((a, b) => b.basePrice - a.basePrice)
            : VegList.toSorted((a, b) => a.basePrice - b.basePrice)
        )
        : VegList



    return (
        <>
            {isLoading ? <IsLoading /> :
                <>
                    <Filters
                        vegFilter={(type) => applyVegFilter(type)}
                        priceFilter={(value) => applyPriceFilter(value)}
                        active={itemFilter}
                    />

                    <div className="md:grid md:grid-cols-3 self-center items-center md:w-4/5 md:gap-5 md:p-5 mt-5 mb-5">
                        {menuItemList?.map(menuItem => (
                            <div key={menuItem.id} className="w-full shadow md:h-40 p-2">
                                <ul className="flex">
                                    <div className="md:w-2/5 w-1/3">
                                        {menuItem.image && <img src={menuItem.image} alt="item logo" className="object-center w-full h-full" />}
                                    </div>
                                    <div className="border-l-2 pl-2 w-7/12">
                                        <img src={menuItem.isVegeterian ? "/veg.png" : "/nonveg.png"} alt="veg icon" className="w-4" />
                                        <li className="pt-2 truncate text-lg font-medium">{menuItem.name}</li>
                                        <li className="truncate text-wrap-3 text-xs font-thin opacity-90 pl-1">{menuItem.description}</li>
                                        <li>&#x20B9; {menuItem.basePrice}</li>
                                        <li className="border-2 w-fit px-2 p-1 rounded-lg float-end align-bottom border-rose-400">
                                            {
                                                (orderItems?.find(item => item.itemId === menuItem.id)) ?
                                                    <div className="flex flex-row justify-between">
                                                        <span className="pr-2 cursor-pointer" onClick={() => removeItem(menuItem)} >-</span>
                                                        <span>{orderItems[orderItems.findIndex(id => id.itemId === menuItem.id)].quantity}</span>
                                                        <span onClick={() => addItem(menuItem)} className="cursor-pointer pl-2">+</span></div>
                                                    : <span className="cursor-pointer" onClick={() => addItem(menuItem)}>ADD</span>
                                            }
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            }
        </>
    )
}