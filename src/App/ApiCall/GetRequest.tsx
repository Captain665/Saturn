import { useState } from "react";
import axios from "axios";

const useGetRequest = () => {

    const [error, setError] = useState();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();


    const fetch = async (url: string): Promise<void> => {
        setLoading(true)
        axios.get(url).then(
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

export default useGetRequest;