import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Home/HomePage";

export default function BasePage(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="" element={<Home/>}>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}