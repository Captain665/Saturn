import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaStar } from "react-icons/fa6";

export default function MenuList() {
    const { code, id } = useParams();
    const navigate = useNavigate()

    const outlet = JSON.parse(window.sessionStorage.getItem("outletInfo"))
    const stations = JSON.parse(window.sessionStorage.getItem("selectedStation"))
    const trainDetails = JSON.parse(window.sessionStorage.getItem("pnrDetails")).trainInfo
    const selectedItem = JSON.parse(window.sessionStorage.getItem("selectedItemInfo"))
    const pnr = JSON.parse(window.sessionStorage.getItem("pnr"))

    const [outletInfo] = useState(outlet)
    const [stationInfo] = useState(stations)
    const [trainDetail] = useState(trainDetails)

    if (selectedItem === null) {
        var menuDataList = []
    } else {
        var menuDataList = selectedItem
    }

    const [orderItems, setOrderItems] = useState(menuDataList)
    const [menuList, setMenuList] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const requestBody = {
                method: "GET"
            }
            const url = "/outlet/" + outletInfo.id + "/menu"
            const response = await fetch(url, requestBody)
            const jsonData = await response.json();
            if (response.ok) {
                setMenuList(jsonData.result)
            }
        }
        return () => { fetchData() }
    }, [outletInfo.id, code, id])

    useEffect(() => {
        window.sessionStorage.setItem("selectedItemInfo", JSON.stringify(orderItems))
    }, [orderItems])


    function addItem(menuItem) {
        const data = {
            itemId: menuItem.id,
            quantity: 1,
            name: menuItem.name,
            description: menuItem.description,
            basePrice: menuItem.basePrice,
            isVegeterian: menuItem.isVegeterian
        }
        const existItemIndex = orderItems.findIndex(item => item.itemId === data.itemId)

        setOrderItems((prevData) => {
            if (existItemIndex !== -1) {
                const updatedItem = [...prevData]
                updatedItem[existItemIndex] = {
                    itemId: prevData[existItemIndex].itemId,
                    quantity: prevData[existItemIndex].quantity + 1,
                    name: prevData[existItemIndex].name,
                    description: prevData[existItemIndex].description,
                    basePrice: prevData[existItemIndex].basePrice,
                    isVegeterian: prevData[existItemIndex].isVegeterian
                }
                return updatedItem;
            } else {
                return [...prevData, data]
            }
        })
    }

    function removeItem(menuItem) {
        const existItem = orderItems.findIndex(a => a.itemId === menuItem.id)
        const existQuantity = orderItems[existItem].quantity;
        setOrderItems(prevData => {
            if (existQuantity > 1) {
                const updatedItem = [...prevData]
                updatedItem[existItem] = {
                    itemId: menuItem.id,
                    quantity: updatedItem[existItem].quantity - 1,
                    name: prevData[existItem].name,
                    description: prevData[existItem].description,
                    basePrice: prevData[existItem].basePrice,
                    isVegeterian: prevData[existItem].isVegeterian
                }
                return updatedItem
            } else {
                return prevData.filter(a => a.itemId !== menuItem.id)
            }
        })
    }


    function handleCheckOut() {
        navigate("/cart")
    }

    function backToOutlet(){
        navigate("/"+pnr+"/outlets/"+stationInfo.code)
    }


    const stationAndOutlet = (
        <div className="flex w-11/12 p-5 h-60 shadow">
            <div className="w-1/5 shadow-md rounded-md">
                <div className="bg-black opacity-80 h-1/2 text-white p-3">
                    <p className="text-sm">Delivery Details</p>
                    <p><span className="pt-1 text-lg font-semibold">{trainDetail.name}</span> <span className="font-bold">({trainDetail.trainNo})</span></p>
                    <p className="text-sm pt-2"><span>On {stationInfo.depDate}</span><span>, at {stationInfo.departure}</span></p>
                </div>
                <div className="p-3">
                    <p className="text-sm">Delivery Station</p>
                    <p className="text-xl font-semibold"><span>{stationInfo.name}</span> <span>({stationInfo.code})</span></p>
                    <p><span>{(stationInfo.delayArrival === 0 || stationInfo.delayArrival === null) ? "On time " : "Late by " + stationInfo.delayArrival + " mins, "}</span>
                        <span>{stationInfo.halt === "--" ? " Starting station" : " " + stationInfo.halt + " mins halt"}</span></p>
                </div>
            </div>
            <div className="w-3/5 pl-10 flex flex-col">
                <p className="text-4xl font-semibold">{outletInfo.outletName}</p><br /><hr /><br />
                <p><span className="text-lg">Minimum Order &#x20B9;{outletInfo.minOrderValue}</span></p><br />
                <div className="flex text-lg gap-3">
                    <p className="text-[#FFD700] text-xl"><FaStar /></p>
                    <p className="">{outletInfo.ratingValue}</p>
                    <p className="">Based on {outletInfo.ratingCount} Ratings</p>
                </div>
                <p className="">{outletInfo.deliveryCost > 0 ? "" : "Free Delivery"}</p>
            </div>
            <div className="w-1/5 rounded-sm">
                <img src={outletInfo.logoImage} alt="logo" className="object-center w-full h-full" />
            </div>
        </div>
    )



    const menuData = <>
        {menuList ? menuList.map(menuItem => (
            <div key={menuItem.id} className="w-full shadow-lg h-40 p-2">
                <ul className="flex">
                    <div className="w-2/5">
                        {menuItem.image && <img src={menuItem.image} alt="item logo" className="object-center w-full h-full" />}
                    </div>
                    <div className="border-l-2 pl-2 w-7/12">
                        <img src={menuItem.isVegeterian ? "/veg.png" : "/nonveg.png"} alt="veg icon" className="w-4" />
                        <li className="pt-2 truncate text-lg font-medium">{menuItem.name}</li>
                        <li className="truncate text-wrap-3 text-xs font-thin opacity-90 pl-1">{menuItem.description}</li>
                        <li>&#x20B9; {menuItem.basePrice}</li>
                        <li className="border-2 w-fit px-2 p-1 rounded-lg float-end align-bottom border-[#ff7e8b]">
                            {
                                (orderItems.find(item => item.itemId === menuItem.id)) ?
                                    <div className="flex flex-row justify-between">
                                        <span className="pr-2 cursor-pointer" onClick={() => removeItem(menuItem)} >-</span>
                                        <span>{orderItems[orderItems.findIndex(id => id.itemId === menuItem.id)].quantity}</span>
                                        <span onClick={() => addItem(menuItem)} className="cursor-pointer pl-2">+</span></div>
                                    : <span className="cursor-pointer" onClick={() => addItem(menuItem)}>ADD</span>
                            }
                        </li>
                    </div>
                </ul>
            </div>
        )) : <h1>Loading...</h1>}
    </>


    return (
        <>
        <p className="bg-green-100 cursor-pointer p-2" onClick={backToOutlet}><span className="font-bold text-2xl w-1/2 pl-8 ">&#x2190;</span>  Outlets</p>
            <div className="w-full flex flex-col justify-center self-center items-center p-5">
                {stationAndOutlet}
                <div className="grid grid-cols-3 self-center items-center w-4/5 gap-5 p-5">
                    {menuData}
                </div>
            </div>
            {orderItems.length > 0 && <>
                <div className="shadow-lg border-2 p-2 rounded-lg w-4/6 self-center fixed bottom-2 bg-green-300" >
                    <ul className="flex place-items-baseline justify-around">
                        <li className="text-xl font-bold">Cart</li>
                        <li>Item : {orderItems.length}</li>
                        <li>Amount : &#x20B9;{orderItems.reduce((a, b) => a + (b.basePrice * b.quantity), 0)}</li>
                        <li className="p-2 px-4 rounded-md cursor-pointer bg-orange-300" onClick={handleCheckOut}>Checkout</li>
                    </ul>
                </div>
            </>
            }
        </>
    )
}