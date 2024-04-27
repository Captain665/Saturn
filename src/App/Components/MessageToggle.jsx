import React, { memo, useEffect } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};

function ErrorToster({ props }) {

    useEffect(() => {

        const status = props?.status;
        const msg = props?.error;
        const result = props?.result;

        const fail = "failure"

        if (status === fail) {
            toast.error(msg, { autoClose: 3000 })
        } else {
            toast.success(result, { autoClose: 3000 })
        }

    }, [props])


    return (
        <div>
            <ToastContainer
                autoClose={1000}
                position="bottom-center"
                theme="colored"
                pauseOnHover={false}
                transition={Zoom}
                icon={false}
                closeButton={false}
                stacked={true}
                hideProgressBar={true}
                toastClassName={(context) =>
                    contextClass[context?.type || "default"] + " relative flex p-1 rounded-md justify-between overflow-hidden cursor-pointer"}
                bodyClassName={() => "text-lg font-white font-med block p-2 m-auto text-center"}
            />
        </div>
    )

}

export default memo(ErrorToster);
