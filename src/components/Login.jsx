import { useState,useEffect, useRef } from "react"
import React from "react";
import  Axios  from "axios"
import Loading from "./Loading";
import defaultPfp from '../assets/Screenshot_20230327_201324_Gallery.png'
export default function Login(props){
    const [clicked,setClicked]=useState(false)
    const clickedRef = React.createRef();
    const [userStatus,setUserStatus]=useState(false)
    const loginDiv=useRef(null)
    const [isLoadingLogin,setIsLoadingLogin]=useState(false)
    const [wantPfp,setWantPfp]=useState(false)
    const [pfpSelected, setPfpSelected]=useState(false)
    const [file,setFile]=useState()
    const formm=useRef()
    const pfp=useRef()

    
    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
          setPfpSelected(true);
          setFile(e.target.files[0])
        } else {
          setPfpSelected(false);
        }
      };
     
      async function postPfp(e){
        e.preventDefault();
        
       
        const formData = new FormData();
        if(file){
            
            formData.append("photo",file)
        }
        formData.append('id',localStorage.getItem('id'))
    //    formData.append('file',pfp.current.files[0])
        
        // const tt=pfp.current.files[0]
        // console.log(tt)
        // const newFormData={
        //     file: tt,
        //     id:localStorage.getItem('id')
        // }
   
        try {
            
            const res=await Axios.post('https://chatapp-com.onrender.com/api/uploadProfile',formData, { headers: { "Content-Type": "multipart/form-data" } })
          
            props.changeIsloggedIn(res.data.photo)
        } catch (error) {
            console.log(error)
        }
  
       
        
        

       
        
    
            
      }
    const pfpPage=<div className="flex text-white justify-center flex-col items-center bg-slate-700 h-screen w-full">
      
        <img src={defaultPfp} alt="" className="rounded-full w-20"/>
        <form ref={formm} onSubmit={postPfp}  className="grid content-center">    <div className="flex flex-col justify-center items-center"> select a picture 
       
       <input ref={pfp}  onChange={handleFileChange} name='file' className="flex rounded-full bg-slate-500 flex-col" type="file"  />
       {/* <input type="hidden" name={localStorage.getItem('id')} value="123" /> */}
       </div>
       {pfpSelected===false?<div className="text-white px-5 ml-4 flex flex-col justify-center items-center">
        
        would you like to step up a profile picture <br /> <span className=" text-xl font-bold "> or</span>  <a className="text-blue-300 underline cursor-pointer text-xl "  onClick={()=>props.changeIsloggedIn()}>skip</a>
    </div>: <button className="bg-blue-900 py-1 rounded-full px-2 mt-5">Done</button>
    }
    </form>
   
    </div>


// function countChar(input){
    // const ob={}
    // const arrrr=input.split('')
    // let c=0
    // if(c===0){
    // arrrr.forEach(v=>ob[v]=0)
    // c++
    // }
    // let s=arrrr.length
    // for(let i=0; i<=arrrr.length-1; i++)
    // {
    //   
    // arrrr.forEach((v,index)=>{
        // 
            // if(v===arrrr[s-1] && v!==' ' && index===s-1){
                // 
                // console.log(index,v,s)
                // ob[v]=ob[v]+1
            //    
            //    
        // }
    //   
    //   
        // })
        // s=s-1
    // }
// 
        // console.log(ob)
// 
// }
// countChar('i have 89387834885 in my bank')
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
            {/* {pfpPage} */}
            {props.isLoading && <Loading div={loginDiv}/>}
{userStatus? login: props.resIsBack?pfpPage:<div className="text-white flex flex-col  justify-center items-center bg-slate-700 h-screen w-full">
        
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
