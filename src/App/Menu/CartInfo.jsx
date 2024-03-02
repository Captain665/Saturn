import React, { memo } from "react";
import { FaTrashCan, FaCartShopping } from "react-icons/fa6";


function CartInfo({ orderItems, handleCheckOut }) {

    const totalItems = orderItems.length;
    const totalAmount = orderItems.reduce((a, b) => a + (b.basePrice * b.quantity), 0).toFixed(2);

    return (
        <>
            {totalItems > 0 &&
                < div className="flex justify-center font-extrabold text-white" >
                    <ul className="flex fixed bottom-0 bg-[#60b246] w-full md:w-1/2 p-3 md:p-4 px-5 z-50 justify-between">
                        <li className="">{totalItems} Item added</li>
                        <li className="flex items-center gap-1 cursor-pointer" onClick={handleCheckOut}>
                            <li>VIEW CART</li>
                            <li><FaCartShopping /></li>
                        </li>
                    </ul>
                </div >
            }
        </>

    )
}

export default memo(CartInfo);