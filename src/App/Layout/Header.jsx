import React, { memo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { FaUser, FaHouse, FaPhone, FaInfo, FaBars } from "react-icons/fa6";


function Headers({ name }) {
    const navigate = useNavigate()

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [isVisible, setIsvisible] = useState(false)

    function isActiveCheck({ isActive }) {
        return isActive ? "underline font-bold" : null

    }

    function HandleOnClick() {
        setIsvisible(!isVisible)
    }

    function NavBarInvisible() {
        setIsvisible(false)
    }

    function LogOut() {
        setIsvisible(false)
        if (userInfo) {
            localStorage.clear();
            navigate("/")
            window.location.reload(true)
        }
    }

    const linkValue = userInfo ? "LogOut" : "Login"
    const pathName = userInfo ? "/" : "/login"

    const account = name ? name.split(" ")[0] : "Account"
    const home = <p className="flex gap-1 items-center"><FaHouse className="" />Home</p>
    const contact = <p className="flex gap-1 items-center"><FaPhone /> Contact Us</p>
    const about = <p className="flex gap-1 items-center"><FaInfo /> About</p>

    const links = <>
        <NavLink to="/" end className={(isActive) => isActiveCheck(isActive)} onClick={NavBarInvisible}>{home}</NavLink>
        <NavLink to="about" className={(isActive) => isActiveCheck(isActive)} onClick={NavBarInvisible}>{about}</NavLink>
        <NavLink to="contact" className={(isActive) => isActiveCheck(isActive)} onClick={NavBarInvisible}>{contact}</NavLink>
        <NavLink to="account" className={(isActive) => isActiveCheck(isActive)} onClick={NavBarInvisible}>
            <p className="flex gap-1 items-center"><FaUser /> {account}</p></NavLink>
        <NavLink to={pathName}
            className="bg-orange-500 text-center p-1 rounded-md border:none md:hidden text-white" onClick={LogOut}>{linkValue}</NavLink>
    </>


    return (
        <>
            <header className="flex w-full flex-row justify-between items-center shadow-lg bg-rose-200">
                <NavLink to="/" className="flex items-center">
                    <img src="https://logowik.com/content/uploads/images/restaurant9491.logowik.com.webp" alt="logo" className="p-3 h-20 object-content ml-4 md:ml-20 rounded-2xl" />
                </NavLink>
                <nav className="hidden md:flex w-1/2 items-center justify-around place-content-center flex-col md:flex-row">
                    {links}
                </nav>
                <nav className={`md:hidden relative w-full`} >
                    <span className={`float-right text-3xl ${isVisible ? "border-2" : null} border-black p-1 mr-10 cursor-pointer`} onClick={HandleOnClick}><FaBars /></span>

                    <div className={`flex-col bg-rose-300 p-5 gap-5 md:hidden ${isVisible ? "flex" : "hidden"} z-[100] absolute right-5 top-12 rounded-lg`}>
                        {links}
                    </div>
                </nav>
            </header>
        </>
    )
}

export default memo(Headers);