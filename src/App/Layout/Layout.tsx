import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Footers from "./Footer";
import Headers from "./Header";
import ReactGA from 'react-ga'
import { GetLocalData } from "../Components/CustomHooks"
import { userInfo } from "../CommonTypes/CommonType"
import ErrorToster from "../Components/MessageToggle"
import Spinner from "../Components/Spinner";

const TRACKING_ID = 'G-1YNT583Y31';
ReactGA.initialize(TRACKING_ID);

const usePageViews = (location: any) => {
    useEffect(() => {
        ReactGA.pageview(location.pathname + location.key)
    }, [location])
}

export default function LayOut() {

    const location = useLocation();
    usePageViews(location);
    const [param] = useSearchParams();

    const [userName, setUserName] = useState<string>('')
    const userdata: userInfo = GetLocalData("userInfo");

    useEffect(() => {
        if (userdata) {
            const name: string = userdata.fullName;
            const userName: string = name.split(" ")[0]
            setUserName(userName)
        } else {
            const account: string = "Account"
            setUserName(account);
        }
    }, [userdata])

    return (
        <div className="flex flex-col">
            <Headers name={userName} />
            <main className="min-h-screen w-full">
                <Outlet />
            </main>
            <ErrorToster />
            <Footers />
        </div>
    )
}