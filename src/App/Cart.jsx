import React from "react";

export default function CartDetails() {

    const outlet = window.sessionStorage.getItem("outletInfo")
    const outletInfo = JSON.parse(outlet)
    const station = window.sessionStorage.getItem("selectedStation")
    const stationInfo = JSON.parse(station)
    const items = window.sessionStorage.getItem("selectedItemInfo")
    const itemInfo = JSON.parse(items)
    const user = window.localStorage.getItem("userInfo")
    const userInfo = JSON.parse(user)

    const currenDay = new Date()

    console.log(outletInfo)
    console.log(stationInfo)
    console.log(itemInfo)


    const outletDetails = (
        <>
            <div>
                <img src={outletInfo.logoImage} alt="" />
                <p>{outletInfo.outletName}</p>
                <p>Ordered at {currenDay.getHours() + ":" +  currenDay.getMinutes()},</p>
                <p>{currenDay.getDate() + "-" +  currenDay.getMonth()+1 + "-" + currenDay.getFullYear()}</p>
            </div>
        </>
    )

    const userDetailsAndDeliveryDetails = (
        <>
            <div>
                <p>Delivery to</p>
                <p>{userInfo.fullName}</p>
                <p>{userInfo.mobileNumber}</p>
                <p>{stationInfo.name}</p>
                <p>{stationInfo.depDate}</p>
                <p>{stationInfo.departure}</p>
            </div>
        </>
    )

    const itemDetails = itemInfo.map(item => (
        <>
        <div>
            <p>{item.isVegeterian}</p>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.basePrice}</p>
            <p>{item.quantity}</p>
        </div>
        </>
        
    ))
    const paymentDetails = (
        <>
            <div>
                <p>Subtotal </p>
                <p>taxes</p>
                <p>delivery Charges</p>
                <p>Total Payable</p>
            </div>
        </>
    )


    return (
        <div>
            {outletDetails}
            {userDetailsAndDeliveryDetails}
            {itemDetails}
            {paymentDetails}
            <div>
                <button type="submit">Place Order</button>
            </div>
        </div>
    )
}