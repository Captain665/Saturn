import React, { useState } from "react";
import { useLocation, useParams } from "react-router";

export default function MenuList() {
    const { code, id } = useParams();
    const { state } = useLocation()
    const { station } = state
    const { outlet } = state
    const {trainInfo} = state;
    const [outletInfo] = useState(outlet)
    const [stationInfo] = useState(station)
    const [trainDetail] = useState(trainInfo)
    const [menuList, setMenuList] = useState(["menu item page"])

    console.log(trainInfo)
    console.log(outletInfo)
    console.log(stationInfo)


    const stationAndOutlet = (
        <>
            <div>

            </div>
            <div>

            </div>
        </>
    )

    const menuData = menuList.map(menuItem => (
        <div>
            {menuItem}
        </div>
    ))

    return (
        <>
            <div>
                {stationAndOutlet}
                {menuData}
            </div>
        </>
    )
}