import React from "react";
import { FaSpinner } from "react-icons/fa6";
import DeliveryInfo from "./DeliveryInfo";
import ItemInfo from "./ItemList";
import PaymentInfo from "./PaymentInfo";

export default function CartDetails({
    isLoading, returnToMenu,
    userInfo, trainInfo, stationInfo, seatInfo,
    createOrder, outletInfo, itemList, removeItem, addItem

}) {


    return (
        <> {isLoading ? <h1 className="h-screen w-fit m-auto flex items-center text-4xl animate-spin"><FaSpinner /></h1> :
            <>
                <div className="bg-rose-100 cursor-pointer flex justify-between p-2" onClick={returnToMenu}>
                    <p><span className="font-bold text-2xl w-1/2 pl-8">&#x2190;</span> Menu Items</p>
                    <p className="font-medium text-4xl w-1/2 text-start">Your Cart</p>
                </div>
                <div className="w-11/12 self-center m-6 flex gap-5 align-top">
                    <DeliveryInfo
                        userInfo={userInfo}
                        trainInfo={trainInfo}
                        stationInfo={stationInfo}
                        seatInfo={seatInfo}
                    />
                    <ItemInfo
                        outletInfo={outletInfo}
                        itemList={itemList}
                        removeItem={removeItem}
                        addItem={addItem}
                    />
                </div>
                <PaymentInfo
                    itemList={itemList}
                    createOrder={createOrder}
                    outletInfo={outletInfo}
                />
            </>
        }
        </>
    )
}