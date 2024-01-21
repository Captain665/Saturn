import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import LayOut from "./App/Layout/Layout";
import About from "./App/FrontPage/About";
import Contact from "./App/FrontPage/ContactUs";
import Account from "./App/Accounts/Account";
import NonExistPath from "./InvalidPath";
import TrainDetail from "./App/Stations/TrainDetails";
import StationList from "./App/Stations/Stations";
import OutletList from "./App/Outlets/Outlets";
import MenuList from "./App/Menu/Menu";
import CartDetails from "./App/Cart/Cart";
import OrderDetails from "./App/Accounts/Orders";
import Home from "./App/FrontPage/HomePage/Home";


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
                    <Route path="cart" element={<CartDetails />}/>
                    <Route path="order/:orderId" element={<OrderDetails />}/>
                    <Route path="test"/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}