import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Home/HomePage";
import LayOut from "./Layout";
import About from "./Home/About";
import Contact from "./Home/ContactUs";

export default function BasePage(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LayOut/>}>
                <Route index element={<Home/>}/>
                <Route path="about" element={<About/>} />
                <Route path="contact" element={<Contact/>} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}