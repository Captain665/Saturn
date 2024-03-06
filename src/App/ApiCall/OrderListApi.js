
export async function OrderListResponse(auth) {

    const payload = {
        method: 'GET',
        headers: {
            Authorization: auth
        }
    }

    const url = "/api/v2/orders"
    const response = await fetch(url, payload)
    const jsonData = await response.json();
    return jsonData;

}