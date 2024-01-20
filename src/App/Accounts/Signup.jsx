import React from "react";
import { useNavigate } from "react-router";

export default function Signup() {

    const [userInfo, setUserInfo] = React.useState({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        password: "",
        gender: "Male"
    });
    const [context, setContext] = React.useState({error : "", isloading : false, msg : ""})

    const navigate = useNavigate()

    function handleOnChange(event) {
        const target = event.target;
        setUserInfo((prevData) => ({
            ...prevData,
            [target.name]: target.value
        }))
    }

    function handleGender(event){
        setUserInfo((prevData) => ({
            ...prevData, 
            gender : event.target.value
        }))
    }

    const fetchData = async function signup(){
        setContext((prevData) => ({
            ...prevData,
            isloading : true
        }))
        const requestBody = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(userInfo)
        }
        try{
            const response = await fetch("signup" , requestBody)
            const jsonData = await response.json();
        if(response.ok){
            // const email = userInfo.emailId;
            // const mobile = userInfo.mobileNumber
            navigate("?form=verify", {state:{mobileNumber : userInfo.mobileNumber, emailId : userInfo.emailId}} )
            }else{
            setContext((prevData) => ({
                ...prevData,
                isloading : false,
                error : jsonData.error
            }))
        }
        }catch(err){
            console.log(err)
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        fetchData()
    }
    

    return (
        <div>
            <h1 className="text-4xl font-bold text-center" >Create an Account</h1><br />
            {context.error && <p className="text-center text-red-500 font-bold">{context.error}</p>}

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

                <button type="submit" className="bg-rose-500 h-10 border-none rounded text-white text-xl">{context.isloading ? "Submitting..." : "Submit"}</button>
            </form><br />
            <p className="text-center">Have an Account ?  <a href="?form=login" className="text-rose-400">Sign In</a></p><br /><br />
        </div>
    )
}