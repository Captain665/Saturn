import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ErrorToster({ props }) {
    const status = props?.status;
    const msg = props?.error;


    const success = () => {
        toast.success(msg, { autoClose: 4000 })
    }

    const failuer = () => {
        toast.error(msg, { autoClose: 4000 })
    }

    useEffect(() => {
        if (status === "failure") {
            failuer()
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

