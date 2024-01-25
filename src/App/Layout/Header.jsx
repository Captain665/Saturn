import React from "react";
import { NavLink } from "react-router-dom";

import { FaUser,FaHouse, FaPhone, FaInfo } from "react-icons/fa6";


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
                <NavLink to="/" className="flex justify-center w-2/6">
                    <img src="/LogoImage.jpg" alt="logo" className="p-3 h-20 object-content ml-20 rounded-2xl" />
                </NavLink>
                <nav className="flex w-1/2 items-center justify-around place-content-center">
                    <NavLink to="/" end className={(isActive) => isActiveCheck(isActive)}>{home}</NavLink>
                    <NavLink to="about" className={(isActive) => isActiveCheck(isActive)}>{about}</NavLink>
                    <NavLink to="contact" className={(isActive) => isActiveCheck(isActive)}>{contact}</NavLink>
                    <NavLink to="account" className={(isActive) => isActiveCheck(isActive)}><p className="flex gap-1 items-center"><FaUser/> {account}</p></NavLink>
                </nav>
            </header>
        </>
    )
}

export default Headers;