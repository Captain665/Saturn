import React, { memo, useEffect } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { errorState } from "../CommonTypes/CommonType";

const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};

function ErrorToster({ props }: { props: errorState }) {

    useEffect(() => {
        const status: number = props.status;

        if (status !== 200) {
            toast.error(props.error, { autoClose: 1000 })
        } else {
            toast.success(props.result, { autoClose: 3000 })
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
                    contextClass[context?.type || "default"] + " relative flex p-0.5 rounded-md justify-between overflow-hidden"}
                bodyClassName={() => "text-base font-white font-med block p-1 m-auto text-center"}
            />
        </div>
    )

}

export default memo(ErrorToster);
