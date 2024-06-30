import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import OrderList from "../../Orders/OrderList/Orders";
import { FaArrowLeft, FaChevronRight, FaCircleUser, FaCaretRight } from "react-icons/fa6";
import CustomerDetails from "./CustomerInfo";
import { GetLocalData } from "../../Components/CustomHooks";
import { userInfo } from "../../CommonTypes/CommonType";


export default function Account() {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    const info: userInfo = GetLocalData("userInfo");
    const [data, setData] = useState<string | null>();
    const path: string = location.pathname;

    useEffect(() => {
        if (!info) {
            const pathName: string = `/login?redirectedTo=${path}`
            navigate(pathName)
        }
        setData(searchParams.get("data"))
    }, [info, path, navigate, searchParams])


    const LogOut = () => {
        localStorage.clear();
        navigate("/")
        window.location.reload()
    }

    function HandleOnClick(value: string): void {
        setSearchParams(param => {
            param.set("data", value)
            return param;
        })
        // setData(value)
    }

    const backToHome = (): void => {
        navigate("/")
    }

    console.log(searchParams.get("data"))


    return (

        <div className="md:w-4/5 w-11/12 m-auto md:flex justify-start">

            <div className="md:w-2/6 m-auto md:m-0 mt-5 md:mt-10 flex flex-col gap-5 w-full">

                <ul
                    className="text-lg flex items-center gap-2 opacity-70 w-fit cursor-pointer"
                    onClick={backToHome}
                >
                    <li><FaArrowLeft /></li>
                    <li>Back</li>
                </ul>

                <ul className="flex gap-5 items-center">
                    <ul className="text-7xl text-gray-400 opacity-80">
                        <li><FaCircleUser /></li>
                    </ul>

                    <ul className="">
                        <li className="text-lg font-semibold tracking-wide">{info?.fullName}</li>
                        <li className="opacity-80">{info?.emailId}</li>
                        <ul className={`items-center flex gap-1 ${data != "history" ? "text-green-500" : ""} text-lg cursor-pointer`}
                            onClick={() => HandleOnClick("profile")}
                        >
                            <li className="text-xl font-medium hidden md:block" >
                                View details
                            </li>
                            <NavLink to="/customer/details" className="md:hidden">View details </NavLink>
                            <FaCaretRight />
                        </ul>
                    </ul>
                </ul>
                <hr />

                <ul className="flex flex-col mt-10 gap-4 tracking-wide">

                    <ul className={`flex items-center justify-between px-5 cursor-pointer ${data === "history" ? "text-green-500" : ""}`}
                        onClick={() => HandleOnClick("history")}
                    >
                        <li
                            className="text-xl font-medium hidden md:block"

                        >
                            Order History
                        </li>
                        <NavLink to="/orders" className="md:hidden text-xl font-medium">Order History</NavLink>
                        <li className=" opacity-60"><FaChevronRight /></li>
                    </ul>
                    <hr />

                    <ul className="flex items-center justify-between px-5 cursor-pointer">

                        <NavLink to="/" className="text-xl font-medium">Book Order</NavLink>

                        <li className=" opacity-60"><FaChevronRight /></li>
                    </ul>
                    <hr />

                    <ul className="flex items-center justify-between px-5 cursor-pointer">
                        <li className="text-xl font-medium">FAQ</li>
                        <li className=" opacity-60"><FaChevronRight /></li>
                    </ul>
                    <hr />

                    <ul className="flex items-center justify-between px-5 cursor-pointer text-red-500" onClick={LogOut}>
                        <li className="text-xl font-medium ">LOGOUT</li>
                        <li className="opacity-60"><FaChevronRight /></li>
                    </ul>


                </ul>

            </div>

            <div className="md:block hidden w-full">

                {
                    data === "history"
                        ? <OrderList />
                        :
                        <CustomerDetails />
                }
            </div>

        </div>

    )
}