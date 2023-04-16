import { useState ,useEffect, useRef} from 'react'
import './App.css'
import Chat from './components/Chat'
import Axios from "axios"
import pfp from './assets/Screenshot_20230327_201324_Gallery.png'
import Login from './components/Login'
import Loading from './components/Loading'
function App() {
  const [friendArray,setFriendArray]=useState([])
  const [isChat,setIsChat]=useState(false)
  const [searchReturn,setSearchReturn]=useState({})
  const [chat,setChat]=useState(<div></div>)
  const [newNoti,setNewNoti]=useState(true)
  const [newMessages,setNewMessages]=useState(false)
  const [isLoggedIn,setIsLoggedIn]=useState(false)
 const [loginData,setLoginData]=useState({})
 const [main,setMain]=useState(<div></div>)
 const [isLoading,setIsLoading]=useState(false)
 const [windowWidth,setWindowWidth]=useState(window.innerWidth)
 const [invalidCredentials,setinvalidCredentials]=useState(false)
 const [resIsBack, setResIsback]=useState(false)
 const [isPfp,setIsPfp]=useState(null)
 const pfpTag=useRef()
 const appDiv=useRef(null)
 const friendsDiv=useRef(null)
 const rightChatDiv=useRef(null)
 let tempp
 const serachBox=useRef()
 function  newMessagesUpdate() {
  setNewMessages(true)
  
 }
 
 const loadingChange=()=>{
  

  setIsLoading(false)
 }
 const changeIsloggedIn=async(data)=>{


  // const res=await Axios.get(`http://localhost:5000/api/dowloadProfile/${localStorage.getItem('id')}`)
 
  // setIsPfp(data)
  
    if(data){
      localStorage.setItem('photo',data)
    }
    else{
      localStorage.setItem('photo','defaultPfp')
    }

  setIsLoggedIn(true)
 }
 useEffect(() => {
 
 
 

  function watchWidth() {
  
      setWindowWidth(window.innerWidth)
    
  }
  
  window.addEventListener("resize", watchWidth)
  
  return function() {
     
      window.removeEventListener("resize", watchWidth)
  }
}, [])
  // const [userTrue,setUserTrue]=useState({})
  function setPfp(data){
    setIsPfp(data)
  }
  async function loggingIn(d){
    
   
   let res
      try {
        if(d.name){
          setIsLoading(true)
           res=await Axios.post('https://chatapp-com.onrender.com/api/register',d)
           setIsLoading(false)
           localStorage.setItem('id',res.data.id)
           localStorage.setItem('name',res.data.name)
          
      
          setResIsback(true)
        
        }
        else{
          setIsLoading(true)
        //  res=await Axios.post('https://chatapp-com.onrender.com/api/login',d)
         res=await Axios.post('https://chatapp-com.onrender.com/api/login',d)
       
         localStorage.setItem('name',res.data.name)
    
         if(res.data.photo){
  
          localStorage.setItem('photo',res.data.photo)
        }
        else{
          localStorage.setItem('photo','defaultPfp')
        }
         setIsLoading(false)
         setIsLoggedIn(true)
        }
        // setLoginData(resi.data)
        // console.log(loginData)
        const ress=await Axios.get(`https://chatapp-com.onrender.com/api/displayFriends/${res.data.id}`)
        setMain(()=>ress.data.friends.map((friend)=><div  key={friend.theirId} onClick={(e)=>switchChats(e,friend.theirId,friend.friendName,friend.photo)} id={friend.theirId} className='flex flex-cols border-double border-2 p-3 rounded-full items-center gap-10 mt-6 border-slate-500'>
        <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={friend.photo?`data:image/jpeg;base64,${friend.photo}`:pfp} alt='' /><div>{friend.friendName}</div>  
        <div className='relative pb-1 px-3 rounded-xl text-white mr-1 ml-auto '> 
 {newMessages && (<div className='absolute top-0 right-0'> <span class="relative flex h-3 w-3">
 <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
 <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
</span></div>)}
</div>
         </div>) ) 
        setFriendArray(()=>ress.data.friends)
        // console.log(res.data)
        localStorage.setItem('token', res.data.token);
        
     
        setLoginData(res.data)
        // setIsLoggedIn(p=>!p)
        // setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log(error)
        
          setinvalidCredentials(true)
        
      }
  
  }
  
  const [searching,setSearching]=useState(false)

  const [tempMain,setTempMain]=useState('')
  async function addFriend(ob){

    setIsLoading(true)
    
 try {
       // const res=await Axios.post('https://chatapp-com.onrender.com/api/addFriend',ob)
       const res=await Axios.post('https://chatapp-com.onrender.com/api/addFriend',ob)
       const ress=await Axios.get(`https://chatapp-com.onrender.com/api/displayFriends/${res.data.myId}`)
   
   setSearching(false)
   
   // setFriendArray(p=>{
   //   p.push(
   //     {
   //       myName: res.data.myName,
   //       friendName: res.data.theirName,
   //       myId: res.data.myId,
   //       theirId:res.data.theirId,
   //       photo:res.data.photo?`data:image/jpeg;base64,${res.data.photo}`:pfp
   //     }
   //   )
   //   // const t=p
   //   return [...new Set(p)]
   // })
   
   setIsLoading(false)
   
   setMain(()=>ress.data.friends.map((friend)=><div key={friend.theirId} onClick={(e)=>switchChats(e,friend.theirId,friend.friendName,friend.photo)} id={friend.theirId} className='flex flex-cols border-double border-2 p-3 rounded-full items-center gap-10 mt-6 border-slate-500'>
   <img ref={pfpTag} className='rounded-full border-2 border-solid border-slate-700 w-10' src={friend.photo?`data:image/jpeg;base64,${friend.photo}`:pfp} alt='' /><div>{friend.friendName}</div>  
    </div>) ) 
 } catch (error) {
  console.log(error)}
  }
  function goBack(){
    setIsChat(false)
    setChat(<div></div>)
  }
  async function switchChats(e,id,name,profilePic){
    
    if(windowWidth<640){
     
    setIsChat(true)
    }
   try{
    const token=localStorage.getItem('token')
    setChat(()=>{
    setIsLoading(true)
    return <Chat
    newMessagesUpdate={()=>newMessagesUpdate()}
    newMessages={newMessages}
    isLoading={isLoading}
    loadingChange={()=>loadingChange()}
    id={id}
    name={name}
    goBack={goBack}
    photo={profilePic}
    // chatPfp={localStorage.getItem('photo')==="defaultPfp"?pfp:`data:img/jpeg;base64,${localStorage.getItem('photo')}`}
    connectDB={(url)=>connectDB(url)}
    token={token}
    />})
    
   }
  
   catch(error){
    console.log(error)
   }
  }
  async function search(e){
    if(searching===true){
      serachBox.current.value=''
     }
    setIsLoading(true)
    const number=e.target.parentElement.childNodes[0].value
    const url=`https://chatapp-com.onrender.com/api/search/${number}`
try{
  const user=await Axios.get(url)
  
  setTempMain(()=><div id={user.data._id} className='flex flex-cols border-double border-2 p-3 rounded-full items-center gap-10 mt-6 border-slate-500'>
     <img className='rounded-full border-2 border-solid border-slate-700 w-10 ' src={user.data.Photo?`data:image/jpeg;base64,${user.data.Photo}`:pfp} alt="" /><div>{user.data.name}</div><button onClick={()=>addFriend({myName:loginData.name,theirName:user.data.name,myId:loginData.id,theirId:user.data._id})} className=" text-white bg-slate-600 ml-auto px-2 py-1 rounded-lg" >Add</button>
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
  <div className='grid mx-2 pt-2 grid-cols-3 content-center'><input ref={serachBox} className='px-4  bg-slate-500 text-white py-2 rounded-3xl col-span-2' type="text" placeholder='search'/><button onClick={(e)=>search(e)} className='col-span-1'>{searching?"cancel":"search"}</button></div>
  {!searching && <div  id={localStorage.getItem('id')} className='flex flex-cols mb-4 border-double border-4 p-3 rounded-full items-center gap-10 mt-6 border-slate-500'>
   <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={localStorage.getItem('photo')==="defaultPfp"?pfp:`data:image/jpeg;base64,${localStorage.getItem('photo')}`} alt='' /><div>{localStorage.getItem('name')} (you)</div>  
    </div>}
  <div className='flex'><h3 className='pl-2 text-blue-900 text-3xl font-bold'>Freinds:</h3>
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
resIsBack={resIsBack}
invalidCredentials={invalidCredentials}
isLoading={isLoading}
loggingIn={(data)=>loggingIn(data)}
changeIsloggedIn={(data)=>changeIsloggedIn(data)}
/>
}
</div>

)
}

export default App