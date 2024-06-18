import React, { memo, useContext } from "react";
import ItemInfo from "./ItemList";
import { FaArrowLeft } from "react-icons/fa6";
import CartSummary from "./CartSummary";
import { cartInfoContext } from "./Cart";
import { outletInfo } from "../CommonTypes/CommonType";

function CartDetails() {

    const cartInfo: any = useContext(cartInfoContext);

    const returnToMenu: any = cartInfo.returnToMenu;
    const outletInfo: outletInfo = cartInfo.outletInfo;
    const totalItem: number = cartInfo.itemSize;

    return (
        <>
            <ul className="md:w-3/4 w-full mt-5 m-auto">
                <ul className="md:ml-0 ml-2">
                    <li className="text-xl cursor-pointer" onClick={returnToMenu}><FaArrowLeft /></li>
                    <li className="md:text-4xl text-3xl font-extralight mt-3">Your Cart</li>
                </ul>
                <ul className="flex justify-between md:mt-10 mt-5 px-5 md:px-2">
                    <li className="text-xl font-bold">{outletInfo.outletName}</li>
                    <li className="text-lg font-medium">{totalItem} Items</li>
                    <li className="text-gray-600 md:block hidden">Need Help? Call {outletInfo.id}</li>
                </ul>
                <ul className="border-t-2 flex md:flex-row flex-col">
                    <ItemInfo />
                    <CartSummary />
                </ul>
            </ul><br />
        </>
    )
}

export default memo(CartDetails);