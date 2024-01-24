import React from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export default function SignupData({ userInfo, handleSubmit, handleGender, handleOnChange, isloading}) {

    
    return (
        <div>
            <h1 className="text-4xl font-bold text-center" >Create an Account</h1><br />

            <form onSubmit={handleSubmit} method="post" className="flex justify-center flex-col mx-auto w-3/4">

                <label htmlFor="fullname">Fullname</label>
                <input type="text" name="fullName" id="fullname" onChange={handleOnChange}
                    required placeholder="Fullname" value={userInfo.fullName}
                    className="border-2 rounded-lg h-10 pl-2 outline-none" /><br />

                <label htmlFor="number">Mobile Number</label>
                <input type="number" placeholder="Mobile Number" onChange={handleOnChange}
                    required name="mobileNumber" id="number" value={userInfo.mobileNumber}
                    className="border-2 rounded-lg h-10 pl-2 outline-none" /><br />

                <label htmlFor="email">Email</label>
                <input type="email" name="emailId" id="email" onChange={handleOnChange}
                    required placeholder="Email Id" value={userInfo.emailId}
                    className="border-2 rounded-lg h-10 pl-2 outline-none" /><br />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleOnChange}
                    required placeholder="Password" value={userInfo.password}
                    className="border-2 rounded-lg h-10 pl-2 outline-none" /><br />

                <div className="flex justify-around">
                    <input type="button" value="Male" onClick={handleGender}
                        className={`border-2 w-20 cursor-pointer rounded-lg h-10 ${userInfo.gender === "Male" ? "bg-rose-400" : ""}`} />   
                    <input  type="button" value="Female" onClick={handleGender}
                        className={`border-2 w-20 cursor-pointer rounded-lg h-10 ${userInfo.gender === "Female" ? "bg-rose-400" : ""}`} />
                    <input type="button" value="Other" onClick={handleGender}
                        className={`border-2 w-20 cursor-pointer rounded-lg h-10 ${userInfo.gender === "Other" ? "bg-rose-400" : ""}`}/>
                </div><br />

                <button type="submit" className="bg-rose-500 h-10 border-none rounded text-white text-xl">{isloading ? "Submitting..." : "Submit"}</button>
            </form><br />
            <p className="text-center">Have an Account ?  <NavLink to="/login" className="text-rose-400">Sign In</NavLink></p><br /><br />
        </div>
    )
}