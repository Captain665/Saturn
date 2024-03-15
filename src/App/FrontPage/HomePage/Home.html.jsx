import React from "react";
import ErrorToster from "../../../App/Components/MessageToggle";
import IsLoading from "../../../App/Components/Loading";


export default function HomePage({ handleOnChange, handleOnClick, isLoading, error }) {



    return (
        <>
            <div className="w-11/12 m-auto">
                <ul className="flex justify-between bg-slate px-10 w-full h-full">
                    <li className=" justify-center self-center">
                        <ul className="font-extrabold text-6xl ">
                            <li>Meet, Eat &#38;</li>
                            <li>Enjoy The <span className="text-orange-500">True</span></li>
                            <li className="text-orange-500">Taste.</li>
                        </ul>
                        <br />
                        <ul className="text-lg opacity-70">
                            <li>Food Tested Better when you eat it with</li>
                            <li>your family and friends.</li>
                        </ul>
                        <br />  
                        <button className="bg-orange-500 text-white p-4 rounded-xl font-extralight text-xl px-8">Get Started</button>
                    </li>
                    <li className="w-1/2 h-full bg-white text-white">
                        <img src="https://c4.wallpaperflare.com/wallpaper/97/355/812/food-india-indian-wallpaper-preview.jpg" alt="main" />
                    </li>
                </ul>
            </div>







            {/* {isLoading
                ? <IsLoading />
                : <div className="bg-cover bg-center opacity-90 bg-[url('https://www.prideofindia.co/cdn/shop/articles/Best-Cuisines_800x.jpg?v=1690289606')] h-svh bg-no-repeat w-full">
                    <div className="h-screen flex justify-center items-center flex-col">
                        <form className="self-center shadow-xl rounded-xl items-center place-content-center bg-white md:p-10 p-5 flex flex-col md:gap-2 md:flex-row"
                            method="post" onSubmit={handleOnClick}>
                            <input type="number" name="pnr" maxLength={10} minLength={10} onChange={handleOnChange} required
                                className="border-2 rounded-md h-14 outline-none pl-5 text-xl text-start font-medium" placeholder="Enter PNR Number" /><br />

                            <button type="submit"
                                className="px-6 md:p-3 p-2 border-none font-bold rounded-lg text-xl cursor-pointer bg-[#60b246]">Submit</button>
                        </form>
                    </div>
                    {error && <ErrorToster props={error} />}
                </div>
            } */}
        </>
    )
}