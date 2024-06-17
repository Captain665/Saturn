import React from "react";

export default function NoProductExist({ isLoading, logo }: { isLoading : boolean; logo : string | null}) {

    const url = "https://cliffclimbers.in/assets/img/nodatafound.png";
    return (
        <>
            {
                !isLoading &&
                <div className=" md:w-1/3 mt-10 m-auto w-full">
                    <img src={logo ?? url} alt="" className="m-auto" />
                </div>
            }
        </>
    )
}