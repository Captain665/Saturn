import React from "react";

export default function Signup() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center" >Create an Account</h1><br />
            <form action="" className="flex justify-center flex-col mx-auto w-3/4">
                <label htmlFor="fullname">Fullname</label>
                <input type="text" name="fullname" id="fullname" required placeholder="Fullname" className="border-2 rounded-lg h-10 pl-2 outline-none" /><br />
                <label htmlFor="number">Mobile Number</label>
                <input type="number" placeholder="Mobile Number" required name="number" id="number" className="border-2 rounded-lg h-10 pl-2 outline-none" /><br />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required placeholder="Email Id" className="border rounded-lg h-10 pl-2 outline-none" /><br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required placeholder="Password" className="border-2 rounded-lg h-10 pl-2 outline-none" /><br />
                <div required className="flex justify-around">
                    <button type="button" className="border w-20 rounded-lg h-10 text-red-500">Male</button>
                    <button type="button" className="border w-20 rounded-lg h-10 text-red-500">Female</button>
                    <button type="button" className="border w-20 rounded-lg h-10 text-red-500">Other</button>
                </div><br />
                <button type="submit" className="bg-gray-600 h-10 border-none rounded text-white text-xl">Submit</button>
            </form><br />
            <p className="text-center">Have an Account ?  <a href="?form=login" className="text-blue-400">Sign In</a></p><br /><br />
        </div>
    )
}