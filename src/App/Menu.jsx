import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { FaStar } from "react-icons/fa6";

export default function MenuList() {
    const { code, id } = useParams();
    const { state } = useLocation()
    const { stations } = state
    const { outlet } = state
    const { trainDetails } = state;
    const [outletInfo] = useState(outlet)
    const [stationInfo] = useState(stations)
    const [trainDetail] = useState(trainDetails)
    const [menuList, setMenuList] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()

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
        return () => {fetchData()}
    }, [outletInfo.id, code, id])

    function addItem(menuItem) {
        setAmount(oldData => (oldData + JSON.parse(menuItem.basePrice)))
        const data = {
            itemId : menuItem.id,
            quantity: 1,
            name : menuItem.name,
            description : menuItem.description,
            basePrice : menuItem.basePrice, 
            isVegeterian : menuItem.isVegeterian
        }
        const existItemIndex = orderItems.findIndex(item => item.itemId === data.itemId)

        setOrderItems((prevData) => {
            if (existItemIndex !== -1) {
                const updatedItem = [...prevData]
                updatedItem[existItemIndex] = {
                    itemId : prevData[existItemIndex].itemId,
                    quantity: prevData[existItemIndex].quantity + 1,
                    name : prevData[existItemIndex].name,
                    description : prevData[existItemIndex].description,
                    basePrice : prevData[existItemIndex].basePrice,
                    isVegeterian : prevData[existItemIndex].isVegeterian
                }
                return updatedItem;
            } else {
                return [...prevData, data]
            }
        })
    }
    function removeItem(menuItem){
        setAmount(oldData => (oldData - JSON.parse(menuItem.basePrice)))
        const existItem = orderItems.findIndex(item => item.itemId === menuItem.id)
        const existQuantity = orderItems[existItem].quantity;
        setOrderItems(prevData => {
            if(existQuantity > 1){
                const updatedItem = [...prevData]
                updatedItem[existItem] = {
                    itemId : menuItem.id,
                    quantity : updatedItem[existItem].quantity - 1,
                    name : prevData[existItem].name,
                    description : prevData[existItem].description,
                    basePrice : prevData[existItem].basePrice,
                    isVegeterian : prevData[existItem].isVegeterian
                }
                return updatedItem
            }else{
                return prevData.filter(a => a.itemId !== menuItem.id)
            }
        })
    }

    function handleCheckOut(){
        console.log("checkout")
        window.sessionStorage.setItem("selectedItemInfo",JSON.stringify(orderItems))
        navigate("/cart")
    }

    console.log(orderItems)



    const stationAndOutlet = (
        <div className="flex w-11/12 p-5 h-60 shadow">
            <div className="w-1/5 shadow-md rounded-md">
                <div className="bg-black opacity-80 h-1/2 text-white p-3">
                    <p className="text-sm">Delivery Details</p>
                    <p><span className="pt-1 text-xl font-semibold">{trainDetail.name}</span> <span className="font-bold">({trainDetail.trainNo})</span></p>
                    <p className="text-sm pt-2"><span>On {stationInfo.depDate}</span><span>, at {stationInfo.departure}</span></p>
                </div>
                <div className="p-3">
                    <p className="text-sm">Delivery Station</p>
                    <p className="text-xl font-semibold"><span>{stationInfo.name}</span> <span>({stationInfo.code})</span></p>
                    <p><span>{(stationInfo.delayArrival === 0 || stationInfo.delayArrival === null) ? "On time " : "Late by " + stationInfo.delayArrival + " mins, "}</span>
                        <span>{stationInfo.halt === "--" ? " Starting station" : " " + stationInfo.halt + " mins halt"}</span></p>
                </div>
            </div>
            <div className="w-3/5 pl-10">
                <p className="text-4xl font-semibold">{outletInfo.outletName}</p><br /><hr /><br />
                <p><span className="text-lg">Minimum Order &#x20B9;{outletInfo.minOrderValue}</span></p><br />
                <div className="flex text-lg">
                    <p className="text-[#FFD700] text-xl"><FaStar /></p>
                    <p className="pl-2">{outletInfo.ratingValue}</p>
                    <p className="pl-2">Based on {outletInfo.ratingCount} Ratings</p>
                </div>
            </div>
            <div className="w-1/5 rounded-sm">
                <img src={outletInfo.logoImage} alt="logo" className="object-center w-full h-full" />
            </div>
        </div>
    )

    const menuData = menuList.map(menuItem => (
        <div key={menuItem.id} className="w-full shadow-lg h-40 p-2">
            <ul className="flex">
                <div className="w-2/5">
                    {menuItem.image && <img src={menuItem.image} alt="item logo" className="object-center w-full h-full" />}
                </div>
                <div className="border-l-2 pl-2 w-7/12">
                    <img src={menuItem.isVegeterian ? "/veg.png" : "/nonveg.png"} alt="veg icon" className="w-4" />
                    <li className="pt-2 truncate">{menuItem.name}</li>
                    <li className="truncate">{menuItem.description}</li>
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
    ))

    return (
        <>
            <div className="w-full flex flex-col justify-center self-center items-center p-5">
                {stationAndOutlet}
                <div className="grid grid-cols-3 self-center items-center w-4/5 gap-5 p-5">
                    {menuData}
                </div>
                {orderItems.length > 0 && <>
                <div className="flex flex-col gap-5 shadow-lg border-2 p-2 bg-[#ff7e8b] absolute left-6 text-center rounded-lg">
                    <h1 className="text-xl text-white font-bold">Cart</h1>
                    <p>Item : {orderItems.length}</p>
                    <p>Amount : &#x20B9;{JSON.parse(amount).toFixed(2)}</p>
                </div>
                <div className="fixed right-10">
                    <button className=" bg-[#ff7e8b] p-2 px-4 rounded-md" onClick={handleCheckOut}>Checkout</button>
                </div>
                </>
                }

            </div>
        </>
    )
}