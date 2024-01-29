import React, { memo } from "react";

function CartInfo({ orderItems, handleCheckOut }) {

    return (
        <>
            {orderItems?.length > 0 && <>
                <div className="shadow-lg border-2 p-2 rounded-lg md:w-4/6 w-full self-center fixed bottom-2 bg-rose-300" >
                    <ul className="flex place-items-baseline justify-around">
                        <li className="text-xl font-bold">Cart</li>
                        <li>Item : {orderItems.length}</li>
                        <li>Amount : &#x20B9;{orderItems.reduce((a, b) => a + (b.basePrice * b.quantity), 0)}</li>
                        <li className="p-2 px-4 rounded-md cursor-pointer bg-rose-600 text-white" onClick={handleCheckOut}>Checkout</li>
                    </ul>
                </div>
            </>
            }
        </>
    )
}

export default memo(CartInfo);