import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaSquareInstagram, FaFacebook, FaSquareTwitter, FaLinkedin, FaYoutube, FaUser } from "react-icons/fa6";



export default function LayOut() {
    const [userName, setUserName] = React.useState(null)

    useEffect(() => {
        const userdata = localStorage.getItem("userInfo")
        if (userdata) {
            const name = JSON.parse(userdata).fullName;
            setUserName(name)
        }
    }, [])

    const userLogo = <FaUser className="text-lg" />


    return (
        <div className="flex flex-col">
            <header className="flex w-full h-16 flex-row justify-between items-center shadow-md bg-white">
                <NavLink to="/" className="w-2/6">
                    <img src="/LogoImage.jpg" alt="logo" className="p-3 h-20 object-content ml-20 rounded-2xl" />
                </NavLink>
                <nav className="flex w-4/6 items-center gap-20 place-content-center">
                    <NavLink to="/" end className={({ isActive }) => (isActive ? "underline font-bold" : null)}>Home</NavLink>
                    <NavLink to="about" className={({ isActive }) => (isActive ? "underline font-bold" : null)}>About</NavLink>
                    <NavLink to="contact" className={({ isActive }) => (isActive ? "underline font-bold" : null)}>Contact Us</NavLink>
                    <NavLink to="account?form=login" className={({ isActive }) => (isActive ? "underline font-bold" : null)}> {userName ? userName.split(" ")[0] : "Account"}</NavLink>
                </nav>
            </header>
            <Outlet />
            <footer className="bg-neutral-800 w-full shadow-md flex flex-col justify-center text-white h-52">
                <div className="flex space-x-6 justify-center pt-0 cursor-pointer text-4xl">
                    <FaSquareInstagram />
                    <FaFacebook />
                    <FaSquareTwitter />
                    <FaLinkedin />
                    <FaYoutube />
                </div>
                <div className="flex space-x-14 justify-center pt-6 text-white">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink>News</NavLink>
                    <NavLink to="about" >About</NavLink>
                    <NavLink to="contact" >Contact Us</NavLink>
                    <NavLink>Our Team</NavLink>
                </div>
                <div className="flex justify-center pt-6">
                    <p className="text-white align-bottom">Copyright &copy;2024 Designed By <i>MANISH</i></p>
                </div>
            </footer>
        </div>
    )
}