import React, { memo } from "react";
import { FaTrashCan } from "react-icons/fa6";


function CartInfo({ orderItems, handleCheckOut, clearCart }) {

    return (
        <div className="flex flex-col">
            {orderItems?.length > 0 && <>
                <div className="border-2 p-2 rounded md:rounded-lg md:w-4/6 w-full self-center fixed bottom-0 bg-sky-300 z-50">
                    <ul className="flex place-items-baseline justify-around">
                        <FaTrashCan className="text-lg cursor-pointer" onClick={clearCart}/>
                        <li className="text-xl font-bold hidden md:block">Cart</li>
                        <li className="hidden md:block">Item : {orderItems.length}</li>
                        <li>Amount : &#x20B9;{orderItems.reduce((a, b) => a + (b.basePrice * b.quantity), 0)}</li>
                        <li className="md:p-2 p-1.5 md:px-4 rounded-md cursor-pointer md:text-base bg-sky-600 text-white" onClick={handleCheckOut}>Checkout</li>
                    </ul>
                </div>
            </>
            }
        </div>
    )
}

export default memo(CartInfo);