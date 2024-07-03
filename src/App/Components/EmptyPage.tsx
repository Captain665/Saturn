import React from "react";
import { Navigate, useNavigate } from "react-router";

export default function NoProductExist({ isLoading, logo }: { isLoading: boolean; logo: string | null }) {
    const navigate = useNavigate();

    const url = "https://cliffclimbers.in/assets/img/nodatafound.png";
    const back = () => {
        navigate(-1)
    }
    return (
        <>
            {
                !isLoading &&
                <>
                    <div className=" md:w-1/3 mt-10 m-auto w-full">
                        <img src={logo ?? url} alt="" className="m-auto" />
                    </div>
                    <button className="bg-primary-green p-1 m-auto w-fit h-fit text-lg rounded font-extrabold text-white px-2 flex"
                        onClick={() => back()}> Go Back</button>
                </>
            }
        </>
    )
}