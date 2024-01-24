import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ErrorToster({ props }) {
   
    const status = props?.status;
    const msg = props?.error;
    const result = props?.result;


    const success = () => {
        toast.success(result, { autoClose: 4000 })
    }

    const failure = () => {
        toast.error(msg, { autoClose: 4000 })
    }

    useEffect(() => {
        if (status === "failure") {
            failure()
        }else{
            success()
        }
    },[props])


    return (
        <div>
            <ToastContainer />
        </div>
    )

}

