import React, { useState } from "react";
import PaymentInfo from "./PaymentInfo";


export default function Payments() {

    const [paymentSelection, setPaymentSelection] = useState(null)

    const selectPaymentMode = (mode) => {
        setPaymentSelection((prevData) => (prevData === mode ? null : mode))
    }

    const createOrder = () => {
        console.log("order create")
        return null;
    }

    return (
        <PaymentInfo
            paymentMode={selectPaymentMode}
            proceedToPay={createOrder}
            mode={paymentSelection}
            totalAmount={100}
        />
    )
}