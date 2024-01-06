import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./Login";
import Signup from "./Signup";
import Validate from "./Validate";
import OrderDetails from "./Orders";
import CustomerDetails from "./CustomerInfo";

export default function Account() {
    const [param] = useSearchParams()
    const formSet = param.get("form")
    const userDataExist = localStorage.getItem("userInfo")
    const info = JSON.parse(userDataExist)
    const navigate = useNavigate()
    const [data, setData] = React.useState("")


    function logOut() {
        localStorage.clear();
        navigate("/")
        window.location.reload(true)
    }

    function DisplayForm() {
        if (formSet === "signup") {
            return <Signup />
        } else if (formSet === "verify") {
            return <Validate />
        } else {
            return <LoginForm />
        }
    }

    return (
        <div className="p-5 self-center shadow-xl flex flex-col h-fit w-full mt-6 mb-10 rounded-3xl"><br />
            {userDataExist ? <div className="flex justify-around">
                <div className="flex flex-col w-4/12 text-xl p-10 border-4">
                    <input value="Profile" type="button" onClick={() => (setData("profile"))}
                        className={`mt-4 cursor-pointer ${({ isActive }) => (isActive ? "underline font-bold" : null)}`} />

                    <input value="Orders" type="button" onClick={() => (setData("orders"))}
                        className={`mt-4 cursor-pointer ${({ isActive }) => (isActive ? "underline font-bold" : null)}`} />

                    <input value="Logout" type="button" onClick={logOut}
                        className={`mt-4 cursor-pointer ${({ isActive }) => (isActive ? "underline font-bold" : null)}`} />
                </div>
                <div className="w-2/3 p-6 border-4">{data === "orders" ? <OrderDetails token={info.jwt}/> : <CustomerDetails/> }</div>
            </div> : DisplayForm()
            }
        </div>
    )
}