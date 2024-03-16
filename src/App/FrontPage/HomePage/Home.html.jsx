import React, { useState } from "react";
import ErrorToster from "../../../App/Components/MessageToggle";
import IsLoading from "../../../App/Components/Loading";
import { FaStar, FaHandPointRight, FaTrain } from "react-icons/fa6";


export default function HomePage({ handleOnChange, handleOnClick, isLoading, error }) {

    const [dialog, setDialog] = useState(true)



    return (
        <>
            <div className="w-11/12 m-auto">

                <ul className="flex justify-between bg-slate px-10 w-full h-full mt-5">
                    <li className=" justify-center self-center">
                        <ul className="font-extrabold text-6xl">
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
                        <button className="bg-orange-500 text-white p-4 rounded-xl font-extrabold text-xl px-8">Get Started</button>
                    </li>
                    <li className="w-1/2 h-full bg-white text-white items-center self-center">
                        <img src="/main_images.png" alt="main" />
                    </li>
                </ul>


                <ul className="w-full m-auto text-center mt-24">

                    <ul className="mb-6">
                        <li className="text-4xl font-extrabold">Our Special Dish</li>
                        <ul className="text-base opacity-80 my-2">
                            <li>There are many variations of passanger of Lorem ipsum available,</li>
                            <li>but the majarity, have suffered alteration There are many.</li>
                        </ul>

                    </ul>

                    <ul className="flex justify-between p-10 gap-x-16">

                        <ul className="w-2/6 p-2 flex flex-col gap-5">
                            <li className="h-3/5 w-full px-10">
                                <img src="/thali.jpg" alt="" className="w-full h-full object-cover object-center rounded-xl" />
                            </li>
                            <ul>
                                <li className="text-2xl font-extrabold">Veg Special Thali</li>
                                <li className="text-sm opacity-80 mt-1">Food Tasted better when you eat it</li>
                                <li className="text-sm opacity-80">with your family and friends</li>
                                <ul className="flex justify-center mt-2 gap-2 items-center">
                                    <li className="flex text-yellow-400 gap-1">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </li>
                                    <li className="text-sm">
                                        [29]
                                    </li>
                                </ul>
                                <ul className="flex justify-center gap-2 items-center mt-3">
                                    <li className="font-extrabold">&#8377;120</li>
                                    <button className="bg-orange-500 text-white p-1 px-2 py-2 rounded-3xl font-extralight text-sm">Order Now</button>
                                </ul>
                            </ul>
                        </ul>

                        <ul className="w-2/6 p-1 flex flex-col gap-5 shadow-2xl rounded-[40px] bg-white">
                            <li className="h-3/5 w-full px-10">
                                <img src="/burger.png" alt="" className="w-full h-full object-cover object-center rounded-xl" />
                            </li>
                            <ul>
                                <li className="text-2xl font-extrabold">Veg Burger</li>
                                <li className="text-sm opacity-80 mt-1">Food Tasted better when you eat it</li>
                                <li className="text-sm opacity-80">with your family and friends</li>
                                <ul className="flex justify-center mt-2 gap-2 items-center">
                                    <li className="flex text-yellow-400 gap-1">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </li>
                                    <li className="text-sm">
                                        [29]
                                    </li>
                                </ul>
                                <ul className="flex justify-center gap-2 items-center mt-3">
                                    <li className="font-extrabold">&#8377;66</li>
                                    <button className="bg-orange-500 text-white p-1 px-2 py-2 rounded-3xl font-extralight text-sm">Order Now</button>
                                </ul>
                            </ul>
                        </ul>

                        <ul className="w-2/6 p-1 flex flex-col gap-5">
                            <li className="h-3/5 w-full px-10">
                                <img src="/pizza.jpg" alt="" className="w-full h-full object-cover object-center rounded-xl" />
                            </li>
                            <ul>
                                <li className="text-2xl font-extrabold">Veg Pizza</li>
                                <li className="text-sm opacity-80 mt-1">Food Tasted better when you eat it</li>
                                <li className="text-sm opacity-80">with your family and friends</li>
                                <ul className="flex justify-center mt-2 gap-2 items-center">
                                    <li className="flex text-yellow-400 gap-1">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </li>
                                    <li className="text-sm">
                                        [29]
                                    </li>
                                </ul>
                                <ul className="flex justify-center gap-2 items-center mt-3">
                                    <li className="font-extrabold">&#8377;236</li>
                                    <button className="bg-orange-500 text-white p-1 px-2 py-2 rounded-3xl font-extralight text-sm">Order Now</button>
                                </ul>
                            </ul>
                        </ul>
                    </ul>

                    <ul className="mt-10 flex justify-between p-10">
                        <ul className="w-1/2 p-16 items-center self-center">
                            <img src="/many_dish.jpg" alt="many dish" className="w-full h-full object-cover object-center rounded-3xl shadow-2xl bg-orange-300" />
                        </ul>
                        <ul className="w-1/2 p-2 items-start self-center flex flex-col gap-5 text-start">
                            <ul className="text-4xl font-extrabold">
                                <li>We Surb Healthy &#38;</li>
                                <li>Testy Food.</li>
                            </ul>
                            <ul className="text-base opacity-80 my-2">
                                <li>There are many variations of passanger of Lorem ipsum</li>
                                <li>available, but the majarity have suffered alteration There</li>
                                <li>are many variations of passanger at available.</li>
                            </ul>
                            <ul className="bg-orange-500 text-white p-4 rounded-3xl font-extralight text-lg px-6 flex gap-2 items-center">
                                <button>Explore Story</button>
                                <FaHandPointRight />
                            </ul>
                        </ul>
                    </ul>

                    <ul className="flex justify-between h-[35rem] p-5 px-5 w-4/5 m-auto">
                        <ul className="w-2/5 gap-2 flex flex-col items-start self-center text-start">
                            <ul className="text-4xl font-extrabold">
                                <li>Cooked by the Best</li>
                                <li>Chefs in the World.</li>
                            </ul>
                            <ul className="text-base opacity-80 my-2">
                                <li>There are many variations of passanger of Lorem ipsum available,</li>
                                <li>but the majarity have suffered alteration There are many.</li>
                            </ul>
                            <ul className="flex flex-col gap-3 opacity-90">
                                <ul className="flex gap-4 items-center">
                                    <li className="bg-green-600 text-white px-1 rounded-md w-6 h-6 text-lg text-center">&#x2713;</li>
                                    <li className="text-lg op">A guaranted delicious meal.</li>
                                </ul>
                                <ul className="flex gap-4 items-center">
                                    <li className="bg-pink-600 text-white px-1 rounded-md w-6 h-6 text-lg text-center">&#x2713;</li>
                                    <li className="text-lg">Food is guaranted hygienic.</li>
                                </ul>
                                <ul className="flex gap-4 items-center">
                                    <li className="bg-blue-600 text-white px-1 rounded-md w-6 h-6 text-lg text-center">&#x2713;</li>
                                    <li className="text-lg">Cooked quickly</li>
                                </ul>
                            </ul>
                        </ul>
                        <ul className="w-1/2 p-1">
                            <img src="https://t4.ftcdn.net/jpg/00/73/82/95/360_F_73829597_KUsflCydqrFome4VSIDbU70rauHtRbPb.jpg" alt="chefs" className="w-full h-full object-cover object-center" />
                        </ul>
                    </ul>

                    <ul className="flex flex-col mt-10 mb-10">
                        <ul>
                            <li className="text-4xl font-extrabold">What Our Customer Are Saying</li>
                            <ul className="text-base opacity-80 my-2">
                                <li>There are many variations of passanger of Lorem ipsum guaranted, but the majarity</li>
                                <li>have suffered alteration, but the majarity, but the majarity</li>
                            </ul>
                        </ul>
                        <ul className="border-2 border-orange-400 mt-5 m-auto w-2/5 py-10 flex flex-col gap-5 rounded-3xl">
                            <ul className="text-base opacity-80">
                                <li>We help our clients make realize their most important business We</li>
                                <li>help our clients make realize their help our clients</li>
                            </ul>
                            <ul className="flex flex-col justify-between gap-5">
                                <ul className="self-center flex justify-center">
                                    <li className="w-28 -mr-6">
                                        <img src="https://www.mockofun.com/wp-content/uploads/2019/12/circle-crop.jpg" alt="" className="w-full h-full object-cover object-center rounded-xl" />
                                    </li>
                                    <li className="flex items-end -ml-6 text-xs bg-white border-2 h-fit self-end rounded-lg p-[3px] px-1">
                                        <FaStar className="text-yellow-500" />
                                        <FaStar className="text-yellow-500" />
                                        <FaStar className="text-yellow-500" />
                                        <FaStar className="text-yellow-500" />
                                        <FaStar />
                                    </li>
                                </ul>
                                <ul>
                                    <li className="text-xl font-extrabold">Kelvin Andrew</li>
                                    <li className="text-base opacity-80">Happy Customer</li>
                                </ul>
                            </ul>
                        </ul>
                        <li className="w-5 bg-orange-500 h-2 text-center m-auto mt-5 rounded-3xl"></li>
                    </ul>

                </ul>

                <dialog open={dialog} className=" top-96 w-2/6">
                    <form className="border-2 px-10 py-5 flex flex-col gap-5 rounded-xl" method="post" onSubmit={handleOnClick}>

                        <ul className="flex border items-center h-12 bg-gray-100 gap-2 mt-5 text-lg">
                            <li className="bg-white p-2 h-full px-4 flex justify-center self-center items-center">
                                <FaTrain />
                            </li>
                            <li className="w-full">
                                <input type="number"
                                    className="bg-gray-100 outline-none"
                                    placeholder="Enter PNR Number"
                                    required
                                    maxLength={10}
                                    minLength={10}
                                    name="pnr"
                                    id="pnr"
                                    onChange={handleOnChange}
                                />
                            </li>
                        </ul>

                        <ul className="bg-white flex gap-5 border-t-2 justify-end mt-4">

                            <li
                                className="mt-4 px-4 p-2 rounded-lg border-2 font-extrabold cursor-pointer"
                                onClick={() => setDialog(() => false)}>
                                Cancel
                            </li>

                            <button type="submit"
                                className="bg-orange-500 mt-4 px-4 p-2 rounded-lg border-none font-extrabold text-white">
                                {isLoading ? "Loading..." : "Submit"}
                            </button>

                        </ul>
                    </form>

                </dialog>
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