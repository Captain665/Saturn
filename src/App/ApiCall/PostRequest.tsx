import React, { useEffect, useState } from "react";
import axios from "axios"
import { userInfo } from "../CommonTypes/CommonType";
import { GetLocalData } from "../Components/CustomHooks";

const usePostRequest = () => {
    const [error, setError] = useState();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const token: string = GetLocalData("userInfo").jwt;


    const fetch = async (url: string, payload: any): Promise<void> => {
        setLoading(true)

        axios.defaults.headers.common = {
            'Content-Type': 'application/json',
            "Authorization": token
        }

        axios.post(url, payload).then(
            response => {
                setData(response.data.result)
                setLoading(false)
            }
        ).catch(
            error => {
                setError(error.response);
                setLoading(false)
            });
    }


    return { data, isLoading, error, fetch };

}

export default usePostRequest;