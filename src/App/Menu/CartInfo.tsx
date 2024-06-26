import React, { memo } from "react";
import { FaCartShopping } from "react-icons/fa6";


const CartInfo = ({ orderItemsCount, handleCheckOut }:
    { orderItemsCount: number; handleCheckOut: any }) => {

    return (
        <>
            {orderItemsCount > 0 &&
                < div className="flex justify-center font-extrabold text-white">
                    <ul className="flex fixed bottom-0 bg-primary-green w-full md:w-1/2 p-3 md:p-4 px-5 z-50 justify-between rounded">
                        <li className="">{orderItemsCount} Item added</li>
                        <ul className="flex items-center gap-1 cursor-pointer" onClick={handleCheckOut}>
                            <li>VIEW CART</li>
                            <li><FaCartShopping /></li>
                        </ul>
                    </ul>
                </div >
            }
        </>
    )
}

export default memo(CartInfo);