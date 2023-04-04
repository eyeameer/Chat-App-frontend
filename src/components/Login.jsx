import { useState,useEffect } from "react"
import React from "react";
import  Axios  from "axios"
export default function Login(props){
    const [clicked,setClicked]=useState(false)
    const clickedRef = React.createRef();
    const [userStatus,setUserStatus]=useState(false)
clickedRef.current = clicked;
const loginInfo={}
const login= <div className="text-white flex  justify-center items-center bg-slate-700 h-screen w-full">
<form onSubmit={(e)=>{
    e.preventDefault()
    props.loggingIn(loginInfo)
    }} className="flex flex-col justify-between" > 
    <label htmlFor="#numberIn">Number:</label>
    <input  onChange={(e)=>loginInfo.number=parseInt(e.target.value)} className="text-black" type="text" id='numberIn'/> 
    <label htmlFor="#passwordIn">Password:</label>
    <input  onChange={(e)=>loginInfo.password=e.target.value}  className="text-black" type="password" id='passwordIn'/>
    <button  className="bg-sky-600 mt-3 rounded-3xl py-2">Login</button>
</form>
</div>
    return(
    userStatus? login: <div className="text-white flex  justify-center items-center bg-slate-700 h-screen w-full">
                <form onSubmit={(e)=>{
    e.preventDefault()
    props.loggingIn(loginInfo)
    }} className="flex flex-col justify-between" > 
     <label htmlFor="#NameIn">Name:</label>
     <input  onChange={(e)=>loginInfo.name=e.target.value} className="text-black" type="text" id='NameIn'/> 
    <label htmlFor="#numberIn">Number:</label>
    <input  onChange={(e)=>loginInfo.number=parseInt(e.target.value)} className="text-black" type="text" id='numberIn'/> 
    <label htmlFor="#passwordIn">Password:</label>
    <input  onChange={(e)=>loginInfo.password=e.target.value}  className="text-black" type="password" id='passwordIn'/>
    <button  className="bg-sky-600 mt-3 rounded-3xl py-2">register</button>
    <div>Already registered? Login <a onClick={()=>setUserStatus(true)} className="text-blue-300 underline cursor-pointer">here</a></div>
</form>
       </div>

    )
}
