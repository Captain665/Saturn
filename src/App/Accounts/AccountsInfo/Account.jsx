import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomerDetails from "./CustomerInfo";
import { FaSpinner } from "react-icons/fa6";
import OrderList from "../../Orders/OrderList/Orders";
import IsLoading from "../../../Loading";

export default function Account() {
    const location = useLocation()
    const navigate = useNavigate()

    const info = JSON.parse(localStorage.getItem("userInfo"));
    const [data, setData] = useState("profile")
    const [isLoading, setIsLoading] = useState(false)
    const path = location.pathname;

    useEffect(() => {
        setTimeout(() => {
            if (!info) {
                const pathName = `/login?redirectedTo=${path}`
                navigate(pathName)
            }
            setIsLoading(false)
        }, 1000)
        setIsLoading()
    }, [info,path, navigate])


    const LogOut = () => {
        setIsLoading(true)
        localStorage.clear();
        navigate("/")
        window.location.reload(true)
    }

    function HandleOnClick(value) {
        setData(value)
    }


    return (
        <>
            {isLoading ? <IsLoading /> :
                <div className="md:p-5 self-center shadow-xl flex flex-col h-fit w-full md:mt-6 mb-10 rounded-3xl p-1"><br />
                    {info && <div className="flex md:justify-around flex-col md:flex-row">
                        <div className="flex md:flex-col md:w-1/5 text-xl md:p-10 md:border-4 md:border-rose-200 md:justify-start md:gap-3 gap-8 justify-center p-2 w-full">

                            <NavLink to="" onClick={() => HandleOnClick("profile")}
                                className={data === "profile" ? "underline font-bold" : null}>Profile</NavLink>

                            <NavLink to="" onClick={() => HandleOnClick("orders")}
                                className={data === "orders" ? "underline font-bold" : null} >Orders</NavLink>

                            <NavLink onClick={LogOut}
                                className="hidden md:block border-none bg-rose-400 w-fit md:mt-10 md:p-2 md:px-5 rounded-md font-bold hover:bg-rose-300 p-1">Logout</NavLink>

                        </div>
                        <div className="md:w-4/5 p-6 md:border-4 md:border-rose-200 border-t-2 w-full">
                            {
                                data === "orders" ?
                                    <OrderList token={info.jwt} />
                                    : <CustomerDetails info={info} />
                            }
                        </div>
                    </div>
                    }
                </div>
            }
        </>

    )
}