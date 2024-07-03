import { memo } from "react";
import { ImSpinner2 } from "react-icons/im";


function Spinner({ isLoading }: { isLoading: boolean }) {
    return (
        <>
            {isLoading ?
                <dialog open={isLoading} className="flex m-auto h-full bg-transparent justify-center">
                    <ul className="w-fit h-fit flex m-auto justify-end fixed bottom-10 bg-black text-lg items-center gap-2 shadow-2xl px-3 p-1 z-50 rounded">
                        <ImSpinner2 className="animate-spin text-white text-sm font-extrabold" />
                        <li className="text-base text-white">Loading...</li>
                    </ul>
                </dialog>
                : null
            }
        </>
    )
}

export default memo(Spinner);