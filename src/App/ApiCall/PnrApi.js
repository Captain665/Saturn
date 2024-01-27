
export async function PnrResponse(pnr) {


    const message = {
        status: "failure",
        error: "Sorry, Restaurant are not available in your journey"
    }

    const payload = {
        method: "GET"
    }
    const url = "/pnr/" + pnr
    const response = await fetch(url, payload);
    const jsonData = await response.json();
    if (response?.ok) {
        const stationList = jsonData.result.stations.length
        if (stationList > 1) {
            return jsonData;
        } else {
            return message;
        }
    } else {
        return jsonData;
    }
}