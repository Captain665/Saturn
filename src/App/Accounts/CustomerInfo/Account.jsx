import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import CustomerDetails from "./CustomerInfo";
import { FaSpinner } from "react-icons/fa6";
import OrderList from "../../Orders/OrderList/Orders";

export default function Account() {
    const [param, setParams] = useSearchParams()
    const info = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate()
    const [data, setData] = useState("profile")

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            if (!info) {
                setParams("?path=account")
                navigate("/login")
            }
            setIsLoading(false)
        }, 1)
        setIsLoading(true)
    }, [])


    function LogOut() {
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
            {isLoading ? <h1 className="h-screen w-fit m-auto flex items-center text-4xl animate-spin"><FaSpinner /></h1> :
                <div className="p-5 self-center shadow-xl flex flex-col h-fit w-full mt-6 mb-10 rounded-3xl"><br />
                    {info && <div className="flex justify-around">
                        <div className="flex flex-col w-1/5 text-xl p-10 border-4 border-rose-200 justify-start gap-3">

                            <NavLink to="" onClick={() => HandleOnClick("profile")}
                                className={data === "profile" ? "underline font-bold" : null}>Profile</NavLink>

                            <NavLink to="" onClick={() => HandleOnClick("orders")}
                                className={data === "orders" ? "underline font-bold" : null} >Orders</NavLink>

                            <NavLink onClick={LogOut}
                                className="border-none bg-rose-400 w-fit mt-10 p-2 px-5 rounded-md font-bold hover:bg-rose-300">Logout</NavLink>

                        </div>
                        <div className=" w-4/5 p-6 border-4 border-rose-200 ">
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