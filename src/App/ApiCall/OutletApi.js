
export async function OutletResponse(code){

    const payload = {
        method: "GET"
    }
    const url = "/outlet/station/" + code
    const response =  await fetch(url, payload)
    const jsonData =  await response.json();
    if(response.ok){
        return jsonData;
    }else{
        return jsonData;
    }

}