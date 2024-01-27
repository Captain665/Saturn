import React from "react";
import { NavLink } from "react-router-dom";
import { FaSquareInstagram, FaFacebook, FaSquareTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";


function Footers() {

    return (
        <>
            <footer className="bg-neutral-800 opacity-90 w-full shadow-md flex flex-col justify-center text-white h-52">
                <div className="flex space-x-6 justify-center pt-0 cursor-pointer text-4xl">
                    <FaSquareInstagram />
                    <FaFacebook />
                    <FaSquareTwitter />
                    <FaLinkedin />
                    <FaYoutube />
                </div>
                <div className="flex md:space-x-14 pt-6 text-white justify-center gap-5">
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
        </>
    )
}

export default Footers;