import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home/HomePage";
import About from "./Home/About";
import Contact from "./Home/ContactUs";
import NonExistPath from "./InvalidPath";
import Account from "./Accounts/Account";
import OutletList from "./App/Outlets";
import TrainDetail from "./App/TrainDetails";
import StationList from "./App/Stations";
import MenuList from "./App/Menu";
import CartDetails from "./App/Cart";
import OrderDetail from "./App/OrderDetails";
import LayOut from "./Layout/Layout";

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
                    <Route path="order/:orderId" element={<OrderDetail />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}