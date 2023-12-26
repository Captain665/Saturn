import React from "react";

export default function Home(){
    const links = ["Home","About","Contect Us","Account"]

    const value = links.map(item => (
        <a href="/" className="hover:font-bold hover:underline">{item}</a>
    ))
    console.log(value)
    console.log(links)
    return(
        <div className="flex flex-col">
           <header className="flex w-screen h-30 flex-row justify-between items-center shadow">
                <img src="/LogoImage.jpg" alt="logo" className="p-3 h-24 object-content ml-20 rounded-2xl"/>
                <nav className="flex flex-row space-x-20 mr-20">
                    {value}
                </nav>
           </header>
           <main class="p-5 w-screen bg-red-900">
            {/* <img src="/HomeImage.jpg" alt="main" className="" /> */}
            </main>
                </div> 
    )
}