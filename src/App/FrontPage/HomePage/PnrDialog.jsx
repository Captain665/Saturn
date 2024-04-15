import React, { memo } from "react";
import { FaTrain } from "react-icons/fa6";


function ActionDialog({ dialog, handleOnChange, hideDialog, isLoading, handleOnClick }) {

    return (
        <>
            <dialog open id="dialog" className={`top-0 flex justify-center items-center w-full h-full bg-transparent ${dialog ? "backdrop-blur-sm" : "hidden"}`}>
                <ul className="md:w-2/6 w-11/12 border-2 px-10 md:py-5 py-2 flex flex-col gap-5 bg-white rounded-xl shadow-2xl z-50">
                    <ul className="flex border items-center h-12 bg-gray-100 gap-2 mt-5 text-lg">
                        <li className="bg-white md:p-2 h-full px-4 md:px-5 flex justify-center self-center items-center">
                            <FaTrain />
                        </li>
                        <li className="w-full">
                            <input type="number"
                                className="bg-gray-100 outline-none w-full"
                                placeholder="Enter PNR Number"
                                required
                                maxLength="10"
                                minLength="10"
                                name="pnr"
                                id="pnr"
                                onChange={handleOnChange}
                            />
                        </li>
                    </ul>

                    <ul className="flex gap-5 border-t-2 justify-end md:mt-4 mt-2">
                        <li
                            className={`mt-4 px-4 p-2 rounded-lg border-2 font-extrabold cursor-pointer active:opacity-70 ${isLoading && "cursor-no-drop"}`}
                            onClick={hideDialog}>
                            Cancel
                        </li>

                        <button
                            disabled={isLoading}
                            type="submit"
                            onClick={handleOnClick}
                            className={`bg-orange-500 mt-4 px-4 p-2 rounded-lg border-none font-extrabold text-white active:opacity-70 ${isLoading && "cursor-no-drop"}`}>
                            Submit
                        </button>

                    </ul>
                </ul>
            </dialog>
        </>
    )
}

export default memo(ActionDialog);