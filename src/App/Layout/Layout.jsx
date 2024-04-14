import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footers from "./Footer";
import Headers from "./Header";
import ReactGA from 'react-ga'

const TRACKING_ID = 'G-YX6NGK82FX';
ReactGA.initialize(TRACKING_ID);

const usePageViews = (location) => {
    console.log(location.key)
    useEffect(() => {
        ReactGA.pageview(location.pathname + location.key)
    }, [location])
}

export default function LayOut() {
    
    const location = useLocation();
    usePageViews(location);

    const [userName, setUserName] = useState(null)
    const userdata = localStorage.getItem("userInfo")

    useEffect(() => {
        if (userdata) {
            const name = JSON.parse(userdata).fullName;
            const userName = name.split(" ")[0]
            setUserName(userName)
        }else{
            setUserName("Account")
        }
    }, [userdata])


    return (
        <div className="flex flex-col">
            <Headers name={userName} />
            <main className="min-h-screen w-full">
                <Outlet />
            </main>
            <Footers />
        </div>
    )
}