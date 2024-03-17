import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footers from "./Footer";
import Headers from "./Header";

export default function LayOut() {
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