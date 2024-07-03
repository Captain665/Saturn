import axios from "axios"

export async function PostRequest(requestBody: any, url: string) {

    return axios.post(url, requestBody).then(
        response => {
            return response
        }
    ).catch(
        error => {
            return error.response;
        });
}


export async function GetRequest(url: string) {

    return axios.get(url).then(
        response => {
            return response;
        }
    ).catch(
        error => {
            return error.response;
        }
    )
}