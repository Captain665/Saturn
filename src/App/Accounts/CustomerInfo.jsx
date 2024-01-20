import React from "react";

export default function CustomerDetails() {
    const userDataExist = localStorage.getItem("userInfo")
    const info = JSON.parse(userDataExist)
    return (
        <div>
            <h1 className="text-center font-bold text-4xl">Profile</h1>
            <form action="" method="post" className="flex justify-center flex-col mx-auto"><br />
                <label htmlFor="" className="font-bold">Fullname</label>
                <input type="text" name="fullname" id="fullname"
                    disabled value={info.fullName} className="border-2 rounded-lg h-10 pl-2 outline-none" /><br />
                <label htmlFor="" className="font-bold">Mobile Number</label>
                <input type="number" name="number" id="mobile number"
                    disabled value={info.mobileNumber} className="border-2 rounded-lg h-10 pl-2 outline-none" />
                <label htmlFor="" className="font-bold">Email Id</label><br />
                <input type="email" name="email" id="email"
                    disabled value={info.emailId} className="border-2 rounded-lg h-10 pl-2 outline-none" />
                <label htmlFor="" className="font-bold">Password</label><br />
                <input type="password" name="password " id="password"
                    disabled value={info.password} className="border-2 rounded-lg h-10 pl-2 outline-none" />
                <label htmlFor="" className="font-bold">Gender</label><br />
                <input type="gender" name="gender" id="gender"
                    disabled value={info.gender} className="border-2 rounded-lg h-10 pl-2 outline-none" />
            </form>
        </div>
    )
}