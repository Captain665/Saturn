
export async function MenuResponse(outletId){

    const payload = {
        method : "GET"
    }

    const url = "/outlet/" + outletId + "/menu"
    const response = await fetch(url, payload)
    const jsonData =  await response.json()
    if(response.ok){
        return jsonData;
    }else{
        return  jsonData;
    }
}