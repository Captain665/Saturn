import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import { FaUser,FaHouse, FaPhone, FaInfo, FaBars } from "react-icons/fa6";


function Headers({name}) {

    function isActiveCheck({isActive}){
        return isActive ? "underline font-bold" : null
    }

    const account = name ? name.split(" ")[0] : "Account"
    const home = <p className="flex gap-1 items-center"><FaHouse className=""/>Home</p>
    const contact = <p className="flex gap-1 items-center"><FaPhone /> Contact Us</p>
    const about = <p className="flex gap-1 items-center"><FaInfo /> About</p>


    return (
        <>
            <header className="flex w-full flex-row justify-between items-center shadow-lg bg-rose-200">
                <NavLink to="/" className="flex items-center">
                    <img src="/LogoImage.jpg" alt="logo" className="p-3 h-20 object-content ml-4 md:ml-20 rounded-2xl" />
                </NavLink>
                <nav className="hidden md:flex w-1/2 items-center justify-around place-content-center flex-col md:flex-row">
                    <NavLink to="/" end className={(isActive) => isActiveCheck(isActive)}>{home}</NavLink>
                    <NavLink to="about" className={(isActive) => isActiveCheck(isActive)}>{about}</NavLink>
                    <NavLink to="contact" className={(isActive) => isActiveCheck(isActive)}>{contact}</NavLink>
                    <NavLink to="account" className={(isActive) => isActiveCheck(isActive)}><p className="flex gap-1 items-center"><FaUser/> {account}</p></NavLink>
                </nav>
                <nav className="md:hidden mr-10">
                <FaBars className="text-3xl"/>
                </nav>
            </header>
        </>
    )
}

export default memo(Headers);