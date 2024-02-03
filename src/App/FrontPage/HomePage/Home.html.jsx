import React from "react";
import ErrorToster from "../../../MessageToggle";
import IsLoading from "../../../Loading";


export default function HomePage({ pnr, handleOnChange, handleOnClick, isLoading, error }) {



    return (
        <>{isLoading
            ? <IsLoading />
            : <div className="bg-cover bg-center opacity-90 bg-[url('https://www.prideofindia.co/cdn/shop/articles/Best-Cuisines_800x.jpg?v=1690289606')] h-svh bg-no-repeat w-full">
                <div className="h-screen flex justify-center items-center flex-col">
                    <form className="self-center shadow-xl rounded-xl items-center place-content-center bg-gray-200 md:p-10 p-5 flex flex-col md:gap-2 md:flex-row" 
                    method="post" onSubmit={handleOnClick}>
                        <input type="number" name="pnr" maxLength={10} minLength={10} value={pnr} onChange={handleOnChange} required
                            className="border-2 rounded-md h-14 outline-none pl-5 text-xl text-start font-medium" placeholder="Enter PNR Number" /><br />

                        <button type="submit"
                            className="bg-rose-800 px-6 md:p-3 p-2 text-white border-none font-bold rounded-lg text-xl cursor-pointer">Submit</button>
                    </form>
                </div>
                {error && <ErrorToster props={error} />}
            </div>
        }
        </>
    )
}