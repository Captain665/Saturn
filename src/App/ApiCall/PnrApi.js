
export async function PnrResponse(pnr) {


    const payload = {
        method: "GET"
    }
    const url = "/pnr/" + pnr
    const response = await fetch(url, payload);
    const jsonData = await response.json();
    return jsonData;

}