import React, { memo } from "react";

function OrderedItems({ order }) {
    return (
        <>
            <div className="flex flex-col items-center gap-2 w-3/4 m-auto">
                <h1 className="text-2xl font-bold">Your Order</h1><br />
                {order && order.orderItems.map((itemData) => (
                    <div className="flex gap-2 w-11/12 justify-between p-5 border-none bg-white rounded-lg" key={itemData.id}>
                        <ul>
                            <img src={itemData.veg ? "/veg.png" : "/nonveg.png"} alt="item logo" className="w-4" />
                            <li className="font-bold text-lg">{itemData.itemName}</li>
                            <li className="text-sm">{itemData.description}</li>
                            <li>&#x20B9;{itemData.basePrice}</li>
                        </ul>
                        <ul className="flex gap-5 items-center">
                            <li>{itemData.quantity}</li>
                            <li>X</li>
                            <li className="font-bold">&#x20B9;{JSON.parse((itemData.basePrice * itemData.quantity).toFixed(2))}</li>
                        </ul>
                    </div>
                ))}
            </div><br />
            <div className="flex flex-col items-center">
                <ul className="flex flex-col items-center">
                    <li className="font-bold text-lg">{order.outlets.outletName}</li>
                    <li className="inline-flex items-center text-[#696969] text-lg"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7f34yxTYG0KSGuEqSOx7fdQreWcAFdF0EgUkdIlvbww&s" alt="" width={50} />: {order.outlets.fssaiNo}</li>
                </ul><br />
            </div>
        </>
    )
}


export default memo(OrderedItems)