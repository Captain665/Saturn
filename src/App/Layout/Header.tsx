import React, { memo, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { GetLocalData } from "../Components/CustomHooks"
import { userInfo } from "../CommonTypes/CommonType"


function Headers({ name }: { name: string }) {
    const navigate = useNavigate();
    const location = useLocation();
    const path: string = location.pathname;

    const [userInfo] = useState<userInfo>(GetLocalData("userInfo"));
    const [isVisible, setIsvisible] = useState<boolean>(false)
    const boxRef: any = useRef(null)

    useEffect(() => {
        const handleDocumentClick = (event: any) => {
            const boxRefValue = boxRef.current;
            if (boxRefValue && !boxRefValue.contains(event.target)) {
                setIsvisible(() => false)
            }
        }

        document.addEventListener("click", handleDocumentClick)

        return () => {
            document.removeEventListener("click", handleDocumentClick)
        }
    }, [])


    function isActiveCheck({ isActive }: { isActive: boolean }): string {
        return isActive ? "underline font-bold" : ""
    }

    function HandleOnClick(): void {
        setIsvisible(() => !isVisible)
    }

    function NavBarInvisible(): void {
        setIsvisible(false)
    }

    function LogOut(): void {
        setIsvisible(false)
        if (userInfo) {
            localStorage.clear();
            navigate("/")
            window.location.reload();
        }
    }

    const linkValue: string = userInfo ? "Logout" : "Login"
    const pathName: string = userInfo ? "/" : "/login"

    const links = <>
        <NavLink to="/" end className={isActiveCheck} onClick={NavBarInvisible}>Home</NavLink>
        <NavLink to="about" className={isActiveCheck} onClick={NavBarInvisible}>About</NavLink>
        <NavLink to="contact" className={isActiveCheck} onClick={NavBarInvisible}>Contact Us</NavLink>
        <NavLink to="account" className={isActiveCheck} onClick={NavBarInvisible}>{name}</NavLink>

        <NavLink to={pathName}
            className="bg-primary-green text-center p-1 rounded-md border:none md:hidden text-white" onClick={LogOut}>{linkValue}</NavLink>
    </>


    return (
        <>
            <header className={`flex w-full flex-row justify-between items-center md:mt-5 mt-3 ${path === "/" ? null : "shadow-xl bg-white"} `}>
                <NavLink to="/" className="flex items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShl9AxBvXhrjACetW1Gbwauif23ndcwWW94Q&usqp=CAU" alt="logo" className="p-1 h-16 object-content ml-4 md:ml-28 rounded-2xl" />
                </NavLink>
                <nav className="hidden md:flex w-1/2 items-center justify-around place-content-center flex-col md:flex-row text-black opacity-80 font-extrabold px-32">
                    {links}
                </nav>
                <nav className={`md:hidden relative w-full`} ref={boxRef}>
                    <span className={`float-right text-3xl ${isVisible ? "border-2" : null} border-black p-1 mr-10 cursor-pointer`} onClick={HandleOnClick}><FaBars /></span>

                    <div className={`flex-col bg-white p-5 gap-4 md:hidden ${isVisible ? "flex" : "hidden"} z-[50] absolute right-5 top-12 rounded-lg w-40 border-2 shadow-2xl`}>
                        {links}
                    </div>
                </nav>
            </header>
        </>
    )
}

export default memo(Headers);