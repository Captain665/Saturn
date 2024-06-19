import React, { memo } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import NoProductExist from "../Components/EmptyPage";
import { menuInfo, orderItems } from "../CommonTypes/CommonType";

function MenuList({ menuList, orderItems, addItem, removeItem, isLoading }: {
    menuList: menuInfo[];
    orderItems: orderItems[];
    addItem: any;
    removeItem: any;
    isLoading: boolean;
}) {

    return (
        <>
            {menuList.length > 0 ?
                <div className="flex flex-col">
                    <div className="grid md:grid-cols-3 grid-cols-1 self-center items-center md:w-3/4 gap-5 md:p-5 mt-5 mb-5">
                        {menuList?.map(menuItem => (
                            <div key={menuItem.id} className="w-full shadow p-1">
                                <ul className="flex h-40">
                                    <div className="w-2/5">
                                        {menuItem.image && <img src={menuItem.image} alt="item logo" className="object-center object-cover w-full h-full rounded" />}
                                    </div>
                                    <div className="border-l-2 pl-2 w-7/12">
                                        <img src={menuItem.isVegeterian ? "/veg.png" : "/nonveg.png"} alt="veg icon" className="w-4" />
                                        <li className="pt-2 text-lg font-medium line-clamp-1">{menuItem.name}</li>
                                        <li className="text-sm font-thin opacity-90 pl-1 line-clamp-2">{menuItem.description}</li>
                                        <li>&#x20B9; {menuItem.basePrice}</li>
                                        <ul className="border-2 w-2/4 p-0.5 rounded-lg float-end align-bottom border-primary-green inline-flex justify-center">
                                            {
                                                (orderItems?.find(item => item.itemId === menuItem.id)) ?
                                                    <ul className="flex flex-row items-center gap-4">
                                                        <li className="cursor-pointer" onClick={() => removeItem(menuItem?.id)} ><FaMinus className="text-xs font-extrabold" /></li>
                                                        <li>{orderItems[orderItems.findIndex(id => id.itemId === menuItem.id)].quantity}</li>
                                                        <li onClick={() => addItem(menuItem)} className="cursor-pointer"><FaPlus className="text-xs font-extrabold" /></li>
                                                    </ul>
                                                    : <li className="cursor-pointer font-extrabold text-primary-green" onClick={() => addItem(menuItem)}>ADD</li>
                                            }
                                        </ul>
                                    </div>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <NoProductExist isLoading={isLoading} logo={null} />
            }

        </>
    )
}

export default memo(MenuList);