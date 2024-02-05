import React from "react";

export default function ItemInfo({ outletInfo, itemList, removeItem, addItem}) {
    return (
        <>
            <div className="md:w-2/3 bg-sky-200 rounded-xl shadow-md flex flex-col align-center align-top h-fit m-0.5">
                <p className="text-center font-medium md:text-2xl p-4 shadow-lg bg-sky-300 rounded-md text-lg">Cart Summary</p>
                {outletInfo && <ul className="bg-white p-2 gap-10 h-16 flex w-11/12 self-center m-2 rounded-md">
                    <img src={outletInfo.logoImage} alt="outlet logo" className="object-cover bg-gray-300 rounded-lg" width={80} />
                    <li className="font-bold md:text-2xl text-lg">{outletInfo.outletName}</li>
                </ul>}
                {itemList && itemList.map(item => (
                    <ul className="p-4 bg-white w-11/12 self-center content-center shadow-md m-2 rounded-lg flex" key={item.itemId}>
                        <ul className="w-3/4">
                            <img src={item.isVegeterian ? "/veg.png" : "/nonveg.png"} alt="item logo" className="w-4" />
                            <li className="text-lg truncate">{item.name}</li>
                            <li className="text-xs opacity-80 truncate">{item.description}</li>
                            <li className="">&#x20B9;{item.basePrice}</li>
                        </ul>   
                        <ul className="flex w-1/4 justify-around self-center flex-col md:flex-row place-items-center gap-2">
                            <li className="h-fit hidden md:block">&#x20B9;{item.basePrice * item.quantity}</li>
                            <ul className="flex gap-3 border-2 border-sky   -300 h-fit rounded-md px-2 bg-white m-auto">
                                <li className="text-xl cursor-pointer" onClick={() => removeItem(item)}>-</li>
                                <li className="text-lg">{item.quantity}</li>
                                <li className=" text-xl cursor-pointer" onClick={() => addItem(item)}>+</li>
                            </ul>
                            <li className="h-fit md:hidden">&#x20B9;{item.basePrice * item.quantity}</li>

                        </ul>
                    </ul>
                ))}
                <br />
            </div>
        </>
    )
}