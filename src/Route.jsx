import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import LayOut from "./App/Layout/Layout";
import About from "./App/FrontPage/About";
import Contact from "./App/FrontPage/ContactUs";
import Account from "./App/Accounts/Account";
import NonExistPath from "./InvalidPath";
import OutletList from "./App/Outlets/Outlets";
import MenuItem from "./App/Menu/Menu";
import OrderDetails from "./App/Accounts/Orders";
import Home from "./App/FrontPage/HomePage/Home";
import StationList from "./App/Stations/Stations";
import TrainInfo from "./App/Stations/Train";
import CartInfo from "./App/Cart/Cart";


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

                    <Route path=":pnr/outlets" element={<TrainInfo />}>
                        <Route index element={<StationList />} />
                        <Route path=":code" element={<OutletList />} />
                    </Route>
                    <Route path="/station/:code/outlet/:id/menu" element={<MenuItem />} />
                    <Route path="cart" element={<CartInfo />} />
                    <Route path="order/:orderId" element={<OrderDetails />} />
                    <Route path="test" />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}