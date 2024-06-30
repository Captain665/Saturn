import React, { memo, useEffect } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from "react-router-dom";

const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};

function ErrorToster() {
    const [param, setSearchParams] = useSearchParams();

    useEffect(() => {
        const status: string | null = param.get("status");

        if (status != "200") {
            toast.error(param.get("error"), { autoClose: 1000 })
        } else {
            toast.success(param.get("message"), { autoClose: 3000 })
        }
        setTimeout(() => {
            setSearchParams(param => {
                param.delete("error");
                param.delete("status");
                param.delete("message")
                return param;
            })
        }, 1000)

    }, [param])



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
