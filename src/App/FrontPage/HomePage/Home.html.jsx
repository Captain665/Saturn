import React, { useState } from "react";
import ErrorToster from "../../../App/Components/MessageToggle";
import IsLoading from "../../../App/Components/Loading"
import { FaStar, FaHandPointRight, FaTrain } from "react-icons/fa6";


export default function HomePage({ handleOnChange, handleOnClick, error, isLoading }) {

    const [dialog, setDialog] = useState(false)

    const showDialog = () => {
        setDialog(() => true)
    }

    // if (isLoading) {
    //     return <IsLoading isLoading={isLoading}/>
    // }




    return (
        <>
            <div className="md:w-11/12 w-full m-auto">

                <ul className="flex justify-between md:px-10 px-3 w-full h-full mt-5">
                    <li className="justify-center self-center">
                        <ul className="font-extrabold md:text-6xl text-3xl">
                            <li>Meet, Eat &#38;</li>
                            <li>Enjoy The <span className="text-orange-500">True</span></li>
                            <li className="text-orange-500">Taste.</li>
                        </ul>

                        <ul className="md:text-lg text-sm opacity-70 md:mt-7 mt-4 w-4/5">
                            <li>Food Tested Better when you eat it with</li>
                            <li>your family and friends.</li>
                        </ul>

                        <button
                            className="bg-orange-500 md:mt-7 mt-4 text-white md:p-4 p-3 rounded-xl font-extrabold md:text-xl md:px-8 px-4"
                            onClick={showDialog}>
                            Get Started
                        </button>
                    </li>
                    <li className="md:w-1/2 w-5/12 h-full bg-white text-white items-center self-center">
                        <img src="/main_images.png" alt="main" className="w-full h-full object-cover object-center" />
                    </li>
                </ul>


                <ul className="w-full m-auto text-center md:mt-24 mt-10">

                    <ul className="md:mb-6 mb-3">
                        <li className="md:text-4xl text-2xl font-extrabold">Our Special Dish</li>
                        <ul className="md:text-base text-xs opacity-80 my-2">
                            <li>There are many variations of passanger of Lorem ipsum available,</li>
                            <li>but the majarity, have suffered alteration There are many.</li>
                        </ul>

                    </ul>

                    <ul className="flex md:flex-row flex-col justify-between md:p-10 p-2 md:gap-x-16 gap-10">

                        <ul className="md:w-2/6 w-11/12 md:p-2 p-1 flex flex-col gap-5 self-center">
                            <li className="h-3/5 w-full md:px-10 px-5">
                                <img src="/thali.jpg" alt="" className="w-full h-full object-cover object-center rounded-xl" />
                            </li>
                            <ul>
                                <li className="md:text-2xl text-xl font-extrabold">Veg Special Thali</li>
                                <li className="md:text-sm text-xs opacity-80 mt-1">Food Tasted better when you eat it</li>
                                <li className="md:text-sm text-xs opacity-80">with your family and friends</li>
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
                                    <a href="#dialog" className="bg-orange-500 text-white p-1 px-2 py-2 rounded-3xl font-extralight text-sm" onClick={showDialog}>Order Now</a>
                                </ul>
                            </ul>
                        </ul>

                        <ul className="md:w-2/6 w-11/12 p-1 flex flex-col gap-5 md:shadow-2xl md:rounded-[42px] bg-white self-center">
                            <li className="h-3/5 w-full md:px-10 px-5">
                                <img src="/burger.png" alt="" className="w-full h-full object-cover object-center rounded-xl" />
                            </li>
                            <ul>
                                <li className="md:text-2xl text-xl font-extrabold">Veg Burger</li>
                                <li className="md:text-sm text-xs opacity-80 mt-1">Food Tasted better when you eat it</li>
                                <li className="md:text-sm text-xs opacity-80">with your family and friends</li>
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
                                <ul className="flex justify-center gap-2 items-center mt-3 mb-2">
                                    <li className="font-extrabold">&#8377;66</li>
                                    <a href="#dialog" className="bg-orange-500 text-white p-1 px-2 py-2 rounded-3xl font-extralight text-sm" onClick={showDialog}>Order Now</a>
                                </ul>
                            </ul>
                        </ul>

                        <ul className="md:w-2/6 w-11/12 p-1 flex flex-col gap-5 self-center">
                            <li className="h-3/5 w-full md:px-10 px-5">
                                <img src="/pizza.jpg" alt="" className="w-full h-full object-cover object-center rounded-xl" />
                            </li>
                            <ul>
                                <li className="md:text-2xl text-xl font-extrabold">Veg Pizza</li>
                                <li className="md:text-sm text-xs opacity-80 mt-1">Food Tasted better when you eat it</li>
                                <li className="md:text-sm text-xs opacity-80">with your family and friends</li>
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
                                    <a href="#dialog" className="bg-orange-500 text-white p-1 px-2 py-2 rounded-3xl font-extralight text-sm" onClick={showDialog}>Order Now</a>
                                </ul>
                            </ul>
                        </ul>
                    </ul>

                    <ul className="mt-10 flex md:justify-between md:p-10 p-1 justify-center gap-1">
                        <ul className="md:w-1/2 w-2/5 md:p-16 items-center self-center">
                            <img src="/many_dish.jpg" alt="many dish" className="w-full h-full object-cover object-center rounded-3xl shadow-2xl bg-orange-300" />
                        </ul>
                        <ul className="md:w-1/2 w-1/2 p-2 items-start self-center flex flex-col md:gap-5 text-start">
                            <ul className="md:text-4xl text-lg font-extrabold">
                                <li>We Surb Healthy &#38;</li>
                                <li>Testy Food.</li>
                            </ul>
                            <ul className="md:text-base text-xs opacity-80 my-2">
                                <li>There are many variations of passanger of Lorem ipsum</li>
                                <li className="md:block hidden">available, but the majarity have suffered alteration There</li>
                                <li className="md:block hidden">are many variations of passanger at available.</li>
                            </ul>
                            <ul className="bg-orange-500 text-white md:p-4 p-2 rounded-3xl font-extralight md:text-lg text-sm md:px-6 px-2 flex md:gap-2 gap-1 items-center" onClick={showDialog}>
                                <a href="#dialog">Explore Story</a>
                                <FaHandPointRight />
                            </ul>
                        </ul>
                    </ul>

                    <ul className="flex md:justify-between md:h-[35rem] h-[16rem] md:p-5 md:px-5 md:w-4/5 m-auto p-1 justify-center mt-10 md:mt-0">
                        <ul className="md:w-2/5 w-1/2 gap-2 flex flex-col items-start self-center text-start">
                            <ul className="md:text-4xl font-extrabold text-lg">
                                <li>Cooked by the Best</li>
                                <li>Chefs in the World.</li>
                            </ul>
                            <ul className="md:text-base opacity-80 md:my-2 text-xs">
                                <li>There are many variations of passanger of Lorem ipsum available,</li>
                                <li>but the majarity have suffered alteration There are many.</li>
                            </ul>
                            <ul className="flex flex-col md:gap-3 gap-2 opacity-90">
                                <ul className="flex md:gap-4 gap-2 items-center">
                                    <li className="bg-green-600 text-white px-1 md:rounded-md rounded md:w-6 md:h-6 w-4 h-4 md:text-lg text-center text-xs">&#x2713;</li>
                                    <li className="md:text-lg text-xs">A guaranted delicious meal.</li>
                                </ul>
                                <ul className="flex md:gap-4 gap-2 items-center">
                                    <li className="bg-pink-600 text-white px-1 md:rounded-md md:w-6 rounded md:h-6 w-4 h-4 md:text-lg text-center text-xs">&#x2713;</li>
                                    <li className="md:text-lg text-xs">Food is guaranted hygienic.</li>
                                </ul>
                                <ul className="flex md:gap-4 gap-2 items-center">
                                    <li className="bg-blue-600 text-white px-1 md:rounded-md md:w-6 rounded md:h-6 w-4 h-4 md:text-lg text-center text-xs">&#x2713;</li>
                                    <li className="md:text-lg text-xs">Cooked quickly</li>
                                </ul>
                            </ul>
                        </ul>
                        <ul className="md:w-1/2 w-2/5 p-1">
                            <img src="https://t4.ftcdn.net/jpg/00/73/82/95/360_F_73829597_KUsflCydqrFome4VSIDbU70rauHtRbPb.jpg" alt="chefs" className="w-full h-full object-cover object-center" />
                        </ul>
                    </ul>

                    <ul className="flex flex-col mt-10 md:mb-10 mb-5">
                        <ul>
                            <li className="md:text-4xl text-xl font-extrabold">What Our Customer Are Saying</li>
                            <ul className="md:text-base text-xs opacity-80 my-2 w-3/5 md:w-full m-auto">
                                <li>There are many variations of passanger of Lorem ipsum guaranted, but the majarity</li>
                                <li className="md:block hidden">have suffered alteration, but the majarity, but the majarity</li>
                            </ul>
                        </ul>
                        <ul className="border-2 border-orange-400 md:mt-5 mt-2 m-auto md:w-2/5 w-11/12 md:py-10 py-5 flex flex-col md:gap-5 gap-2 rounded-3xl">
                            <ul className="md:text-base text-xs opacity-80">
                                <li>We help our clients make realize their most important business We</li>
                                <li>help our clients make realize their help our clients</li>
                            </ul>
                            <ul className="flex flex-col justify-between md:gap-5">
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

                <dialog open={dialog} id="dialog" className={`top-0 flex justify-center items-center w-full h-screen bg-transparent ${dialog ? "bg-opacity-30 backdrop-blur-sm" : "hidden"}`}>
                    <form method="post" onSubmit={handleOnClick} className="md:w-2/6 w-11/12 border-2 px-10 md:py-5 py-2 flex flex-col gap-5 bg-white rounded-xl shadow-2xl z-50">
                        <ul className="flex border items-center h-12 bg-gray-100 gap-2 mt-5 text-lg">
                            <li className="bg-white md:p-2 h-full px-4 md:px-5 flex justify-center self-center items-center">
                                <FaTrain />
                            </li>
                            <li className="w-full">
                                <input type="number"
                                    className="bg-gray-100 outline-none w-full"
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

                        <ul className="flex gap-5 border-t-2 justify-end md:mt-4 mt-2">
                            <li
                                className="mt-4 px-4 p-2 rounded-lg border-2 font-extrabold cursor-pointer active:opacity-70"
                                onClick={() => setDialog(() => false)}>
                                Cancel
                            </li>

                            <button type="submit"
                                className="bg-orange-500 mt-4 px-4 p-2 rounded-lg border-none font-extrabold text-white active:opacity-70">
                                Submit
                            </button>

                        </ul>
                    </form>
                </dialog>

                {error && <ErrorToster props={error} />}
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
                    {}
                </div>
            } */}
        </>
    )
}