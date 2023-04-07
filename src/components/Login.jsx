import { useState,useEffect, useRef } from "react"
import React from "react";
import  Axios  from "axios"
import Loading from "./Loading";
export default function Login(props){
    const [clicked,setClicked]=useState(false)
    const clickedRef = React.createRef();
    const [userStatus,setUserStatus]=useState(false)
    const loginDiv=useRef(null)
    const [isLoadingLogin,setIsLoadingLogin]=useState(false)
clickedRef.current = clicked;
const loginInfo={}
const login= <div className="text-white flex flex-col  justify-center items-center bg-slate-700 h-screen w-full">
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
{props.invalidCredentials && (<div className="text-red-600 text-center">Invalid credentials! <br /><span> please check your number and password again</span></div>)}
</div>
// useEffect(()=>{
    // if(props.isLoading===true){
// setIsLoadingLogin(true)
    // }}
// ,[])
    return(
        <div ref={loginDiv}  className="min-h-screen">
            {props.isLoading && <Loading div={loginDiv}/>}
    {userStatus? login: <div className="text-white flex flex-col  justify-center items-center bg-slate-700 h-screen w-full">
        
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
{props.invalidCredentials && (<div className="text-red-600 text-center">Invalid credentials! <br /><span> please enter valid credentials</span></div>)}
       </div>
}

       </div>
    )
}
