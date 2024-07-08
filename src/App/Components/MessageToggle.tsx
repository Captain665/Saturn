import React, { memo, useEffect } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const contextClass = {
    success: "bg-green-100 text-green-600 font-extrabold ",
    error: "text-red-600 bg-red-100 ",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};

function ErrorToster({ props }: { props: any }) {

    useEffect(() => {

        const status: number = props?.status;
        const error = props?.data === undefined ? props?.error : props?.data?.error
        const success = props?.result;

        if (status !== 200) {
            toast.error(error, { autoClose: 1000 })
        } else {
            toast.success(success, { autoClose: 2000 })
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
                    contextClass[context?.type || "default"] + "m-auto p-0.5 rounded overflow-hidden shadow-lg"}
                bodyClassName={() => "text-base font-white font-base block p-0.5 m-auto text-center"}   
            />
        </div>
    )   

}

export default memo(ErrorToster);
