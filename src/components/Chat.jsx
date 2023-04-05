
import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import pfp from '../assets/Screenshot_20230327_201324_Gallery.png'
import { EventSourcePolyfill } from 'event-source-polyfill';
export default function Chat(props){
    console.log("changed?")
    const [input,setInput]=useState('')
    let ogId
    const [chatState,setChatState]=useState([])
    const [count,setCount]=useState(props.id)
    const dummy=useRef()
    const clear=useRef()
if(count!==props.id){
    setCount(props.id)
}
function counter() {
    
    setCount((p)=>p++)
    
    setTimeout(counter, 1000);
}

    const settingChats=async()=>{
        try {
            const res=await Axios.get(`https://chatapp-com.onrender.com/api/chats/getMessages/${props.id}`,{headers:{Authorization: `Bearer ${props.token}`}},{ogId:ogId})
        
            //  setChatState((p)=>res.data[0].messages.map((mssg)=>mssg.id!==props.id?<div className='my-2  text-right'><span className='bg-green-600 rounded-full py-1 m-4 px-2'>{mssg.message}</span></div>:<div className=' my-2'><span className='bg-green-800 rounded-full py-1  px-2'>{mssg.message}</span></div>))
        } catch (error) {
            // console.log(error)
        }
    }
    useEffect(()=>{
        setChatState([])
          
        const eventSource = new EventSourcePolyfill(`https://chatapp-com.onrender.com/api/chats/getMessages/${props.id}`,{headers:{Authorization:`Bearer ${props.token}`}})
        eventSource.onmessage = (event) => {
            try{
          const newMessages = event.data;
       
          setChatState(JSON.parse(newMessages));
                      
        setTimeout(()=>{
            dummy.current.scrollIntoView({behavior:'smooth'})
        },400)}
        catch(error){
            console.log(error)
        }
        };
              return () => {
                eventSource.close();
              };            
    },[count])

    const mssgBox=(e)=>{
setInput(e.target.value)
    }
    async function sendMssg(){
        document.getElementById('clear').value=''
        try {
        
            const res=await Axios.post('https://chatapp-com.onrender.com/api/chats/sendMessage',{theirId:props.id,messages:{message:input}},{headers:{Authorization: `Bearer ${props.token}`}})
            
            // dummy.current.scrollIntoView({behavior:'smooth'})
           
        } catch (error) {
        }
    }
    return(
        // <div id={props.id} className=' bg-slate-700 text-white'>
            <div id={props.id} className='bg-slate-700 text-white flex flex-col min-h-screen'>
           <div className='flex  sticky flex-cols border-double border-2 p-3 bg-slate-700 rounded-full items-center gap-10  top-0 border-slate-500'>
 <div onClick={()=>props.goBack()} className='text-3xl pl-2 mt-1' ><ion-icon name="arrow-back-circle-outline"></ion-icon></div> <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={pfp} alt="" /><div>{props.name}</div>
</div>
           <div id='messages' className=' m-5 grid grid-rows flex-grow-1'>

            {chatState.map((mssg)=>mssg.id!==props.id?<div > <ul className='my-2 text-right'><li className='inline-block bg-green-600 rounded-2xl  py-1  px-2'>{mssg.message}</li></ul> </div>:<ul className=' my-2'><li className='inline-block bg-green-800 rounded-full py-1  px-2'>{mssg.message}</li></ul>)}
            <div ref={dummy}></div>
            
 </div >
 <div className='bg-slate-700 z-50 sticky bottom-2 mt-auto content-center inline-flex w-full justify-center items-center'><input id='clear' ref={clear} onChange={(e)=>mssgBox(e)} type="text" placeholder='Message' className='w-11/12 rounded-full col-span-7 bg-slate-700 p-2 border-gray-400 border-2 '/><button onClick={(e)=>sendMssg()} className='border-2 border-slate-500 rounded-full pt-1 ml-2 px-3 text-2xl text-sky-500'><ion-icon name="send-outline"></ion-icon></button></div>
 </div>
        // </div>
    )
}











