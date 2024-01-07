import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home/HomePage";
import LayOut from "./Layout";
import About from "./Home/About";
import Contact from "./Home/ContactUs";
import NonExistPath from "./InvalidPath";
import Account from "./Accounts/Account";
import OutletList from "./App/Outlets";
import TrainDetail from "./App/TrainDetails";
import StationList from "./App/Stations";
import MenuList from "./App/Menu";

export default function BasePage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayOut />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="account" element={<Account />} />
                    <Route path="*" element={<NonExistPath />} />

                    <Route path=":pnr/outlets" element={<TrainDetail />}>
                        <Route index element={<StationList />}/>
                        <Route path=":code" element={<OutletList />} />
                    </Route>
                    <Route path="/station/:code/outlet/:id/menu" element={<MenuList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}