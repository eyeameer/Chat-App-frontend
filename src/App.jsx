import { useState ,useEffect, useRef} from 'react'
import './App.css'
import Chat from './components/Chat'
import Axios from "axios"
import pfp from './assets/Screenshot_20230327_201324_Gallery.png'
import Login from './components/Login'
import Loading from './components/Loading'
function App() {
  const [isChat,setIsChat]=useState(false)
  const [searchReturn,setSearchReturn]=useState({})
  const [chat,setChat]=useState(<div></div>)
  const [newNoti,setNewNoti]=useState(true)
  const [isLoggedIn,setIsLoggedIn]=useState(false)
 const [loginData,setLoginData]=useState({})
 const [main,setMain]=useState(<div></div>)
 const [isLoading,setIsLoading]=useState(false)
 const [windowWidth,setWindowWidth]=useState(window.innerWidth)
 const appDiv=useRef(null)
 const friendsDiv=useRef(null)
 const rightChatDiv=useRef(null)
 let tempp
 
 const loadingChange=()=>{
  setIsLoading(false)
 }
 useEffect(() => {
 
 
 

  function watchWidth() {
  
      setWindowWidth(window.innerWidth)
    
  }
  
  window.addEventListener("resize", watchWidth)
  
  return function() {
     
      window.removeEventListener("resize", watchWidth)
  }
}, [friendArray])
  // const [userTrue,setUserTrue]=useState({})
  const [friendArray,setFriendArray]=useState([])
  async function loggingIn(d){
    setIsLoading(true)
   
   let res
      try {
        if(d.name){
          
           res=await Axios.post('https://chatapp-com.onrender.com/api/register',d)
        }
        else{
         res=await Axios.post('https://chatapp-com.onrender.com/api/login',d)
        }
        // setLoginData(resi.data)
        // console.log(loginData)
        const ress=await Axios.get(`https://chatapp-com.onrender.com/api/displayFriends/${res.data.id}`)
        setMain(()=>ress.data.friends.map((friend)=><div onClick={(e)=>switchChats(e,friend.theirId,friend.friendName)} id={friend.theirId} className='flex flex-cols border-double border-2 p-3 rounded-full items-center gap-10 mt-6 border-slate-500'>
        <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={pfp} alt='' /><div>{friend.friendName}</div>  
         </div>) ) 
        setFriendArray(()=>ress.data.friends)
        // console.log(res.data)
        localStorage.setItem('token', res.data.token);
     
       
  setLoginData(res.data)
        setIsLoggedIn(p=>!p)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
  
  }
  
  const [searching,setSearching]=useState(false)
  const [tempMain,setTempMain]=useState('')
  async function addFriend(ob){
    setIsLoading(true)
    const res=await Axios.post('https://chatapp-com.onrender.com/api/addFriend',ob)
  
setSearching(false)

setFriendArray(p=>{
  p.push(
    {
      myName: res.data.myName,
      friendName: res.data.theirName,
      myId: res.data.myId,
      theirId:res.data.theirId
    }
  )
  const t=p
  return[...t]
})
setIsLoading(false)
setMain(()=>friendArray.map((friend)=><div onClick={(e)=>switchChats(e,friend.theirId,friend.friendName)} id={friend.theirId} className='flex flex-cols border-double border-2 p-3 rounded-full items-center gap-10 mt-6 border-slate-500'>
<img className='rounded-full border-2 border-solid border-slate-700 w-10' src={pfp} alt='' /><div>{friend.friendName}</div>  
 </div>) ) 
  }
  function goBack(){
    setIsChat(false)
    setChat(<div></div>)
  }
  async function switchChats(e,id,name){
    if(windowWidth<640){
     
    setIsChat(true)
    }
   try{
    const token=localStorage.getItem('token')
    setChat(()=>{
    setIsLoading(true)
    return <Chat
    isLoading={isLoading}
    loadingChange={()=>loadingChange()}
    id={id}
    name={name}
    goBack={goBack}
    connectDB={(url)=>connectDB(url)}
    token={token}
    />})
    
   }
  
   catch(error){
    console.log(error)
   }
  }
  async function search(e){
    setIsLoading(true)
    const number=e.target.parentElement.childNodes[0].value
    const url=`https://chatapp-com.onrender.com/api/search/${number}`
try{
  const user=await Axios.get(url)
  setTempMain(()=><div id={user.data._id} className='flex flex-cols border-double border-2 p-3 rounded-full items-center gap-10 mt-6 border-slate-500'>
     <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={pfp} alt="" /><div>{user.data.name}</div><button onClick={()=>addFriend({myName:loginData.name,theirName:user.data.name,myId:loginData.id,theirId:user.data._id})} className=" text-white bg-slate-600 ml-auto px-2 py-1 rounded-lg" >Add</button>
  </div>)
}

catch(error){
  console.log(error)
  setTempMain(()=><div className='w-full h-full flex justify-center items-center' ><span className='text-3xl'>no user found :(</span></div>)
}
setIsLoading(false)
setSearching(p=>!p)
  }
tempp=searching?tempMain:main
return(
  <div ref={appDiv}>
    {isLoading && <Loading div={appDiv}/>}
{isLoggedIn? 

<div className={isChat?"":'bg-blue-900 w-full h-screen grid grid-cols-4'}>

<div className={isChat?'':'bg-blue-200 h-screen pb-2 overflow-y-auto scrollbar-hide sm:col-span-1 w-full col-span-4'}>
{isChat===false &&
(<div>
  <div className='grid mx-2 pt-2 grid-cols-3 content-center'><input className='px-4 bg-slate-500 text-white py-2 rounded-3xl col-span-2' type="text" placeholder='search'/><button onClick={(e)=>search(e)} className='col-span-1'>{searching?"cancel":"search"}</button></div>
  <div className='flex'><h3 className='pl-2 text-blue-900 text-3xl font-bold'>Freinds:</h3>
  {/* <button className='relative pb-1 px-3 rounded-xl text-white mr-1 ml-auto bg-blue-900'> {windowWidth} */}
  {/* {newNoti && (<div className='absolute top-0 right-0'> <span class="relative flex h-3 w-3"> */}
  {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
  {/* <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span> */}
{/* </span></div>)} */}
{/* </button> */}
</div>
</div>)
}

<div ref={friendsDiv} >
{(isLoading && windowWidth<640 )  && <Loading div={friendsDiv}/>}
{isChat && windowWidth<640?
chat  :
tempp}
</div>

</div>
{windowWidth>=640 && (
<div ref={rightChatDiv} className=' bg-slate-700 text-gray-200 sm:col-span-3 sm:h-full h-0 col-span-0 overflow-y-hidden sm:overflow-y-auto'>
  {isLoading && <Loading div={rightChatDiv}/>}
 {chat}
</div>)}
</div>: <Login
isLoading={isLoading}
loggingIn={(data)=>loggingIn(data)}
/>
}
</div>

)
}

export default App