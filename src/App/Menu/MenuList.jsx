import React from "react";
import { FaSpinner } from "react-icons/fa6";

export default function MenuList({ menuList, isLoading, orderItems, addItem, removeItem }) {


    return (
        <>
            {isLoading ? <h1 className="m-auto w-fit h-screen flex items-center text-6xl animate-spin"> <FaSpinner /> </h1> :
                <>
                    <div className="grid grid-cols-3 self-center items-center w-4/5 gap-5 p-5">
                        {menuList?.map(menuItem => (
                            <div key={menuItem.id} className="w-full shadow-lg h-40 p-2">
                                <ul className="flex">
                                    <div className="w-2/5">
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
                    </div><br />
                </>
            }
        </>
    )
}