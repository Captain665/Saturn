
export async function OrderDetailResponse(token, orderId) {
    const payload = {
        method: "GET",
        headers: {
            Authorization: token
        }
    }
    const url = "/order/" + orderId

    const response = await fetch(url, payload)
    const jsonData = await response.json();
    return jsonData;
}