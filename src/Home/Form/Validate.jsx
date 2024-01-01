import React from "react";

export default function Validate(){
    const email = "testemail"
    return(
        <div>
        <h1 className="text-4xl font-bold text-center">Email Verification</h1><br />
        <form action="" className="flex justify-center flex-col mx-auto w-3/4">
            <label htmlFor="email">Email Id</label>
            <input type="email" placeholder="Email Id" name="email" id="email" value={email} disabled className="border rounded-lg h-10 pl-2 outline-none " /><br />
            <label htmlFor="number">OTP</label>
            <input type="number" name="number" id="number" required placeholder="OTP" className="border rounded-lg h-10 pl-2 outline-none" /><br />
            <button type="submit" className="bg-gray-600 h-10 border-none rounded text-white text-xl">Submit</button>
        </form><br />
        <p className="text-center">Have an Account ?  <a href="?form=login" className="text-blue-400">Sign in</a></p><br /><br />
    </div>
    )
}