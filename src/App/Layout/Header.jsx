import React, { memo, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { FaUser, FaHouse, FaPhone, FaInfo, FaBars } from "react-icons/fa6";


function Headers({ name }) {
    const navigate = useNavigate()

    const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")) || null)

    const [isVisible, setIsvisible] = useState(false)
    const boxRef = useRef(null)

    useEffect(() => {
        const handleDocumentClick = (event) =>{
            if(boxRef.current && !boxRef.current.contains(event.target)){
                setIsvisible(() => false)
            }
        }

        document.addEventListener("click",handleDocumentClick)

        return () => {
            document.removeEventListener("click",handleDocumentClick)
        }
    },[])

    function isActiveCheck({ isActive }) {
        return isActive ? "underline font-bold" : null
    }

    function HandleOnClick() {
        setIsvisible(() => !isVisible)
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
            className="bg-sky-500 text-center p-1 rounded-md border:none md:hidden text-white" onClick={LogOut}>{linkValue}</NavLink>
    </>


    return (
        <>
            <header className="flex w-full flex-row justify-between items-center shadow-lg bg-[#60b246]">
                <NavLink to="/" className="flex items-center">
                    <img src="data:image/jpeg;base64,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" alt="logo" className="p-3 h-20 object-content ml-4 md:ml-20 rounded-2xl" />
                </NavLink>
                <nav className="hidden md:flex w-1/2 items-center justify-around place-content-center flex-col md:flex-row text-black opacity-80 font-extrabold text-xl">
                    {links}
                </nav>
                <nav className={`md:hidden relative w-full`} ref={boxRef}>
                    <span className={`float-right text-3xl ${isVisible ? "border-2" : null} border-black p-1 mr-10 cursor-pointer`} onClick={HandleOnClick}><FaBars /></span>

                    <div className={`flex-col bg-white p-5 gap-4 md:hidden ${isVisible ? "flex" : "hidden"} z-[100] absolute right-5 top-12 rounded-lg w-40 border-2`}>
                        {links}
                    </div>
                </nav>
            </header>
        </>
    )
}

export default memo(Headers);