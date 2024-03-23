import React from "react";
import ItemInfo from "./ItemList";
import IsLoading from "../../App/Components/Loading"
import { FaArrowLeft } from "react-icons/fa6";
import CartSummary from "./CartSummary";

export default function CartDetails({
    isLoading, returnToMenu,
    userInfo, trainInfo, stationInfo, seatInfo,
    makePayment, outletInfo, itemList, removeItem, addItem

}) {

    const totalItem = itemList?.reduce((a, b) => a + b.quantity, 0)

    if(isLoading){
        return <IsLoading isLoading={isLoading}/>
    }


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
                    <li className="text-gray-600 md:block hidden">Need Help? Call {outletInfo.mobileNo}</li>
                </ul>
                <ul className="border-t-2 flex md:flex-row flex-col">
                    <ItemInfo
                        outletInfo={outletInfo}
                        itemList={itemList}
                        removeItem={removeItem}
                        addItem={addItem}
                    />
                    <CartSummary
                        outletInfo={outletInfo}
                        itemList={itemList}
                        makePayment={makePayment}
                        userInfo={userInfo}
                        stationInfo={stationInfo}
                        trainInfo={trainInfo}
                        seatInfo={seatInfo}
                    />
                </ul>
            </ul><br />
        </>
    )
}