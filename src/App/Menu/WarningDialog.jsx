import React from "react";
import { FaXmark } from "react-icons/fa6";

const WarningDialog = ({ orderItemsCount, handleCancel, handleContiue, outlet }) => {

    console.log("Warning dialog HTML")


    return (

        <dialog open className="flex m-auto h-full justify-center w-full fixed z-50 bg-opacity-20 top-0 bg-transparent backdrop-blur-sm p-2">
            <ul className="w-fit h-fit flex flex-col m-auto justify-end bg-white border shadow-2xl md:px-7 z-50 rounded-md p-5">
                <ul className="flex items-center justify-between border-b-2">
                    <li className="md:text-xl text-lg font-semibold">Remove existing Cart?</li>
                    <FaXmark className="text-xl cursor-pointer" onClick={handleCancel} />
                </ul>
                <li className="font-extralight mt-3 md:text-base text-sm">Choosing a different restaurant will remove {orderItemsCount} existing items from {outlet?.outletName}.</li>
                <li className="font-extralight md:text-base text-sm">Continue?</li>
                <ul className="flex justify-end gap-5 mt-3 md:text-base text-sm">
                    <button
                        type="submit"
                        className="border-2 p-1 px-5 rounded"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-5 p-1 bg-[#60b246] text-white font-extrabold rounded"
                        onClick={handleContiue}
                    >
                        Continue
                    </button>
                </ul>
            </ul>
        </dialog>
    )
}

export default WarningDialog;