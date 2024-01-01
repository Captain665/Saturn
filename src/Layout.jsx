import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaSquareInstagram, FaFacebook, FaSquareTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";



export default function LayOut() {


    return (
        <div className="flex flex-col">
            <header className="flex w-full h-16 flex-row justify-between items-center shadow-md bg-white">
                <NavLink to="/">
                    <img src="/LogoImage.jpg" alt="logo" className="p-3 h-20 object-content ml-20 rounded-2xl" />
                </NavLink>
                <nav className="flex flex-row space-x-20 mr-20">
                    <NavLink to="/" end className={({isActive}) => (isActive ? "underline font-bold" : null)}>Home</NavLink>
                    <NavLink to="about" className={({isActive}) => (isActive ? "underline font-bold" : null)}>About</NavLink>
                    <NavLink to="contact" className={({isActive}) => (isActive ? "underline font-bold" : null)}>Contact Us</NavLink>
                    <NavLink to="account?form=login" className={({isActive}) => (isActive ? "underline font-bold" : null)}>Account</NavLink>
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