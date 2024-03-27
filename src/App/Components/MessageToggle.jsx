import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ErrorToster({ props }) {


    useEffect(() => {

        const status = props?.status;
        const msg = props?.error;
        const result = props?.result;

        const fail = "failure"

        if (status === fail) {
            toast.error(msg, { autoClose: 4000 })
        } else {
            toast.success(result, { autoClose: 4000 })
        }

    }, [props])


    return (
        <div>
            <ToastContainer />
        </div>
    )

}

