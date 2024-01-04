import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home/HomePage";
import LayOut from "./Layout";
import About from "./Home/About";
import Contact from "./Home/ContactUs";
import NonExistPath from "./InvalidPath";
import Account from "./Accounts/Account";

export default function BasePage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayOut />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="account" element={<Account/>} />
                    <Route path="*" element={<NonExistPath />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}