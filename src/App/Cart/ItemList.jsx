import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function ItemInfo({ itemList, removeItem, addItem }) {
    return (
        <>
            <div className="md:w-2/3 flex flex-col align-top h-fit md:m-5 m-2 mt-3">
                {itemList && itemList.map(item => (
                    <ul className="p-4 content-center rounded flex border mt-2" key={item.itemId}>
                        <ul className="w-3/4">
                            <img src={item.isVegeterian ? "/veg.png" : "/nonveg.png"} alt="item logo" className="w-4" />
                            <li className="text-lg line-clamp-1">{item.name}</li>
                            <li className="text-xs opacity-80 w-3/4 line-clamp-1">{item.description}</li>
                            <li className="">&#x20B9;{item.basePrice}</li>
                        </ul>   
                        <ul className="flex w-1/4 justify-around self-center flex-col md:flex-row place-items-center gap-2">
                            <li className="h-fit hidden md:block">&#x20B9;{(item.basePrice * item.quantity).toFixed(2)}</li>
                            <ul className="flex gap-4 border-2 border-green-400 h-fit rounded-md px-2 bg-white m-auto items-center">
                                <li className="text-xs cursor-pointer" onClick={() => removeItem(item)}><FaMinus /></li>
                                <li className="text-lg">{item.quantity}</li>
                                <li className=" text-xs cursor-pointer" onClick={() => addItem(item)}><FaPlus /></li>
                            </ul>
                            <li className="h-fit md:hidden">&#x20B9;{(item.basePrice * item.quantity).toFixed(2)}</li>

                        </ul>
                    </ul>
                ))}
                <br />
            </div>
        </>
    )
}