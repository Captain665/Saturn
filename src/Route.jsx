import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import LayOut from "./App/Layout/Layout";
import About from "./App/FrontPage/About";
import Contact from "./App/FrontPage/ContactUs";
import Account from "./App/Accounts/AccountsInfo/Account";
import NonExistPath from "./InvalidPath";
import OutletList from "./App/Outlets/Outlets";
import MenuItem from "./App/Menu/Menu";
import Home from "./App/FrontPage/HomePage/Home";
import StationList from "./App/Stations/Stations";
import TrainInfo from "./App/Stations/Train";
import CartInfo from "./App/Cart/Cart";
import OrderDetails from "./App/Orders/OrderDetails/OrderDetail";
import Login from "./App/Accounts/Login/Login";
import Signup from "./App/Accounts/Signup/Signup";
import Filters from "./App/Menu/Filters";
import IsLoading from "./Loading";


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
                    <Route path="test" element={<IsLoading />}/>
                    <Route path="login"  element={<Login />}/>
                    <Route path="signup" element={<Signup />} /> 
                </Route>
            </Routes>
        </BrowserRouter>
    )
}