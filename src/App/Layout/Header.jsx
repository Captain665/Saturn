import React, { memo, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { FaBars } from "react-icons/fa6";


function Headers({ name }) {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

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

    const linkValue = userInfo ? "Logout" : "Login"
    const pathName = userInfo ? "/" : "/login"

    // const account = name ? name.split(" ")[0] : "Account"
    // const home = <p className="flex gap-1 items-center"><FaHouse className="" />Home</p>
    // const contact = <p className="flex gap-1 items-center"><FaPhone /> Contact Us</p>
    // const about = <p className="flex gap-1 items-center"><FaInfo /> About</p>
    // const accounts = <p className="flex gap-1 items-center"><FaUser /> {name}</p>
    
    const links = <>
        <NavLink to="/" end className={(isActive) => isActiveCheck(isActive)} onClick={NavBarInvisible}>Home</NavLink>
        <NavLink to="about" className={(isActive) => isActiveCheck(isActive)} onClick={NavBarInvisible}>About</NavLink>
        <NavLink to="contact" className={(isActive) => isActiveCheck(isActive)} onClick={NavBarInvisible}>Contact Us</NavLink>
        <NavLink to="account" className={(isActive) => isActiveCheck(isActive)} onClick={NavBarInvisible}>{name}</NavLink>
            
        <NavLink to={pathName}
            className="bg-sky-500 text-center p-1 rounded-md border:none md:hidden text-white" onClick={LogOut}>{linkValue}</NavLink>
    </>


    return (
        <>
            <header className={`sticky flex w-full flex-row justify-between items-center md:mt-5 mt-3 ${path === "/" ? null : "shadow-xl bg-white" } `}>
                <NavLink to="/" className="flex items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShl9AxBvXhrjACetW1Gbwauif23ndcwWW94Q&usqp=CAU" alt="logo" className="p-1 h-16 object-content ml-4 md:ml-28 rounded-2xl" />
                </NavLink>
                <nav className="hidden md:flex w-1/2 items-center justify-around place-content-center flex-col md:flex-row text-black opacity-80 font-extrabold px-32">
                    {links}
                </nav>
                <nav className={`md:hidden relative w-full`} ref={boxRef}>
                    <span className={`float-right text-3xl ${isVisible ? "border-2" : null} border-black p-1 mr-10 cursor-pointer`} onClick={HandleOnClick}><FaBars /></span>

                    <div className={`flex-col bg-white p-5 gap-4 md:hidden ${isVisible ? "flex" : "hidden"} z-[100] absolute right-5 top-12 rounded-lg w-40 border-2 shadow-2xl`}>
                        {links}
                    </div>
                </nav>
            </header>
        </>
    )
}

export default memo(Headers);