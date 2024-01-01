import React from "react";

export default function LoginForm(){
    
    return(
        <div>
        <h1 className="text-4xl font-bold text-center" >Login</h1><br />
        <form action="" className="flex justify-center flex-col mx-auto w-3/4">
            <label htmlFor="number">Mobile Number</label>
            <input type="number" placeholder="Mobile Number" name="number" id="number" required className="border rounded-lg h-10 pl-2 outline-none " /><br />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required placeholder="Password" className="border rounded-lg h-10 pl-2 outline-none" /><br />
            <button type="submit" className="bg-gray-600 h-10 border-none rounded text-white text-xl">Sign in</button>
        </form><br />
        <p className="text-center">Don't have an Account ?  <a href="?form=signup" className="text-blue-400">Create Account</a></p><br /><br />
    </div>
    )
}