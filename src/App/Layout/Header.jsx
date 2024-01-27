import React, { memo, useState } from "react";
import { NavLink } from "react-router-dom";

import { FaUser, FaHouse, FaPhone, FaInfo, FaBars } from "react-icons/fa6";


function Headers({ name }) {
    const [isVisible, setIsvisible] = useState(false) 

    function isActiveCheck({ isActive }) {
        return isActive ? "underline font-bold" : null
    }

    function HandleOnClick(){
        setIsvisible(!isVisible)
    }

    const account = name ? name.split(" ")[0] : "Account"
    const home = <p className="flex gap-1 items-center"><FaHouse className="" />Home</p>
    const contact = <p className="flex gap-1 items-center"><FaPhone /> Contact Us</p>
    const about = <p className="flex gap-1 items-center"><FaInfo /> About</p>

    const links = <>
        <NavLink to="/" end className={(isActive) => isActiveCheck(isActive)}>{home}</NavLink>
        <NavLink to="about" className={(isActive) => isActiveCheck(isActive)}>{about}</NavLink>
        <NavLink to="contact" className={(isActive) => isActiveCheck(isActive)}>{contact}</NavLink>
        <NavLink to="account" className={(isActive) => isActiveCheck(isActive)}><p className="flex gap-1 items-center"><FaUser /> {account}</p></NavLink>
    </>


    return (
        <>
            <header className="flex w-full flex-row justify-between items-center shadow-lg bg-rose-200">
                <NavLink to="/" className="flex items-center">
                    <img src="/LogoImage.jpg" alt="logo" className="p-3 h-20 object-content ml-4 md:ml-20 rounded-2xl" />
                </NavLink>
                <nav className="hidden md:flex w-1/2 items-center justify-around place-content-center flex-col md:flex-row">
                    {links}
                </nav>
                <nav className="md:hidden mr-10 border-2 p-1 border-black" onClick={HandleOnClick}>
                    <FaBars className="text-3xl" />
                </nav>  
            </header>
            <div className={`flex-col bg-rose-300 self-end p-5 gap-5 md:hidden ${isVisible ? "flex" : "hidden"} overflow-visible sticky`}>
                {links}
            </div>
        </>
    )
}

export default memo(Headers);