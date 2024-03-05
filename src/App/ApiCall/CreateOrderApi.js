
export async function CreateOrderResponse(trainInfo, stationInfo, seatInfo, outletInfo, userInfo,itemList, pnr,paymentSelection) {
    

    const body = {
        "trainName": trainInfo.name,
        "trainNo": trainInfo.trainNo,
        "stationCode": stationInfo.code,
        "stationName": stationInfo.name,
        "deliveryDate": stationInfo.depDate + " " + stationInfo.departure,
        "coach": seatInfo.coach,
        "berth": seatInfo.berth,
        "outletId": outletInfo.id,
        "customerId": userInfo.id,
        "pnr": pnr,
        "paymentType": paymentSelection,
        "deliveryCharge": outletInfo.deliveryCost,
        "orderFrom": "desktop Web",
        "orderItem": itemList
    }

    const payload = {
        method: "POST",
        headers: {
            "Authorization": userInfo.jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(body)
    }
    const url = "/create/order"
    const response = await fetch(url, payload);
    const jsonData = await response.json();
    return jsonData;
}