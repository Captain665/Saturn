
export async function PnrResponse(pnr) {


    const message = {
        status: "failure",
        error: "Sorry, Restaurant are not available in your journey"
    }

    const payload = {
        method: "GET"
    }
    const url = "https://673a-2409-40d0-102f-3aa2-60f0-eab1-ea54-83f0.ngrok-free.app/api/v2/pnr/" + pnr
    const response = await fetch(url, payload);
    const jsonData = await response.json();
    if (response?.ok) {
        const stationList = jsonData?.result?.stations?.length
        if (stationList >= 1) {
            return jsonData;
        } else {
            return message;
        }
    } else {
        return jsonData;
    }
}