import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import CustomerDetails from "./CustomerInfo";
import { FaSpinner } from "react-icons/fa6";
import OrderList from "../../Orders/OrderList/Orders";

export default function Account() {
    const [param, setParams] = useSearchParams()
    // const path = param.get("path")
    const info = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate()
    const [data, setData] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            if (!info) {
                const url = "/login?path=account"; 
                navigate(url)       
            }
            setIsLoading(false)
        }, 1)
        setIsLoading(true)
    }, [])


    function logOut() {
        localStorage.clear();
        navigate("/")
        window.location.reload(true)
    }

    return (
        <>
            {isLoading ? <h1 className="h-screen w-fit m-auto flex items-center text-4xl animate-spin"><FaSpinner /></h1> :
                <div className="p-5 self-center shadow-xl flex flex-col h-fit w-full mt-6 mb-10 rounded-3xl"><br />
                    {info && <div className="flex justify-around">
                        <div className="flex flex-col w-4/12 text-xl p-10 border-4 ">
                            <NavLink></NavLink>
                            <NavLink></NavLink>
                            <NavLink></NavLink>
                            <input value="Profile" type="button" onClick={() => (setData("profile"))}
                                className={`mt-4 cursor-pointer ${({ isActive }) => (isActive ? "underline font-bold" : null)}`} />

                            <input value="Orders" type="button" onClick={() => (setData("orders"))}
                                className={`mt-4 cursor-pointer ${({ isActive }) => (isActive ? "underline font-bold" : null)}`} />

                            <input value="Logout" type="button" onClick={logOut}
                                className={`mt-4 cursor-pointer ${({ isActive }) => (isActive ? "underline font-bold" : null)}`} />
                        </div>
                        <div className="w-2/3 p-6 border-4 ">{data === "orders" ? <OrderList token={info.jwt} /> : <CustomerDetails info={info} />}</div>
                    </div>
                    }
                </div>
            }
        </>

    )
}