import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaSquareInstagram, FaFacebook, FaSquareTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";



export default function LayOut() {



    
    return (
        <div className="flex flex-col">
            <header className="flex w-screen h-28 flex-row justify-between items-center shadow-md bg-white">
                <NavLink to="/">
                    <img src="/LogoImage.jpg" alt="logo" className="p-3 h-24 object-content ml-20 rounded-2xl" />
                </NavLink>
                <nav className="flex flex-row space-x-20 mr-20">
                    <NavLink to="/" className="hover:font-bold hover:underline">Home</NavLink>
                    <NavLink to="about" className="hover:font-bold hover:underline">About</NavLink>
                    <NavLink to="contact" className="hover:font-bold hover:underline">Contact Us</NavLink>
                    <NavLink to="account" className="hover:font-bold hover:underline">Account</NavLink>
                </nav>
            </header>
            <Outlet />
            <footer className="bg-neutral-800 w-full shadow-md flex flex-col justify-center text-white h-52">
                <div className="flex space-x-6 justify-center pt-0">
                    <FaSquareInstagram className="text-4xl"/>
                    <FaFacebook className="text-4xl"/>
                    <FaSquareTwitter className="text-4xl"/>
                    <FaLinkedin className="text-4xl"/>
                    <FaYoutube className="text-4xl"/>
                </div>
                <div className="flex space-x-14 justify-center pt-6 text-white">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink>News</NavLink>
                    <NavLink to="about" >About</NavLink>
                    <NavLink to="contact" >Contact Us</NavLink>
                    <NavLink>Our Team</NavLink>
                </div>
                <div className="flex justify-center pt-6">
                    <p className="text-white align-bottom">Copyright &copy;2024 Designed By MANISH</p>
                </div>
            </footer>
        </div>
    )
}