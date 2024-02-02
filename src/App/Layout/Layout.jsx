import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footers from "./Footer";
import Headers from "./Header";

export default function LayOut() {
    const [userName, setUserName] = React.useState(null)

    useEffect(() => {
        const userdata = localStorage.getItem("userInfo")
        if (userdata) {
            const name = JSON.parse(userdata).fullName;
            setUserName(name)
        }
    }, [])


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