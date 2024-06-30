import React, { memo, useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useSearchParams } from "react-router-dom";


function Spinner() {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState<string | null>();
    useEffect(() => {
        const loader = searchParams.get("loader");
        setIsLoading(loader);
    }, [searchParams])

    return (
        <>
            {isLoading === "true" ?
                <dialog className="flex m-auto h-full bg-transparent justify-center">
                    <ul className="w-fit h-fit flex m-auto justify-end fixed bottom-10 bg-black text-lg items-center gap-2 shadow-2xl px-5 p-2 z-50 rounded-lg">
                        <ImSpinner2 className="animate-spin text-white text-base font-extrabold" />
                        <li className=" text-xl text-white">Loading...</li>
                    </ul>
                </dialog>
                : null
            }
        </>
    )
}

export default memo(Spinner);