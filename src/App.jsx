import { useState ,useEffect} from 'react'
import './App.css'
import Chat from './components/Chat'
import Axios from "axios"
import pfp from './assets/Screenshot_20230327_201324_Gallery.png'
import Login from './components/Login'
function App() {
  const [isChat,setIsChat]=useState(false)
  const [searchReturn,setSearchReturn]=useState({})
  const [chat,setChat]=useState(<div></div>)
  const [newNoti,setNewNoti]=useState(true)
  const [isLoggedIn,setIsLoggedIn]=useState(false)
 const [loginData,setLoginData]=useState({})
 const [main,setMain]=useState(<div></div>)
 const [windowWidth,setWindowWidth]=useState(window.innerWidth)
 let tempp
 let testu
 useEffect(() => {
  function watchWidth() {
      console.log("Setting up...")
      setWindowWidth(window.innerWidth)
      console.log(windowWidth)
  }
  
  window.addEventListener("resize", watchWidth)
  
  return function() {
      console.log("Cleaning up...")
      window.removeEventListener("resize", watchWidth)
  }
}, [])
  // const [userTrue,setUserTrue]=useState({})
  const [friendArray,setFriendArray]=useState([])
  async function loggingIn(d){
   console.log(d)
   let res
      try {
        if(d.name){
          console.log('register ran')
           res=await Axios.post('http://localhost:5000/api/register',d)
        }
        else{
         res=await Axios.post('http://localhost:5000/api/login',d)
        }
        // setLoginData(resi.data)
        // console.log(loginData)
        const ress=await Axios.get(`http://localhost:5000/api/displayFriends/${res.data.id}`)
        setMain(()=>ress.data.friends.map((friend)=><div onClick={(e)=>switchChats(e,friend.theirId,friend.friendName)} id={friend.theirId} className='flex flex-cols border-double border-2 p-3 rounded-full items-center gap-10 mt-6 border-slate-500'>
        <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={pfp} alt='' /><div>{friend.friendName}</div>  
         </div>) ) 
        setFriendArray(()=>ress.data.friends)
        setLoginData(()=>res.data)
        testu=res.data
        setIsLoggedIn(p=>!p)
      } catch (error) {
        console.log(error)
      }
  
  }
  
  const [searching,setSearching]=useState(false)
  const [tempMain,setTempMain]=useState('')
  async function addFriend(ob){
    const res=await Axios.post('http://localhost:5000/api/addFriend',ob)
setSearching(false)
console.log(res)
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
      console.log('this ran')
    setIsChat(true)
    }
    setChat(<Chat
    id={id}
    name={name}
    goBack={goBack}
    connectDB={(url)=>connectDB(url)}
    token={testu.token}
    />)
  }
  async function search(e){
    const number=e.target.parentElement.childNodes[0].value
    const url=`http://localhost:5000/api/search/${number}`
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
setSearching(p=>!p)
  }
tempp=searching?tempMain:main
return(
isLoggedIn? 

<div className={isChat?"":'bg-blue-900 w-full h-screen grid grid-cols-4'}>

<div className={isChat?'':'bg-blue-200 h-screen overflow-y-hidden sm:col-span-1 w-full col-span-4'}>
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

<div >
{isChat && windowWidth<640?chat:tempp}
</div>

</div>
{windowWidth>=640 && (<div className=' bg-slate-700 text-gray-200 sm:col-span-3 sm:h-full h-0 col-span-0 overflow-y-hidden sm:overflow-y-auto'>
 {chat}
</div>)}
</div>: <Login
loggingIn={(data)=>loggingIn(data)}
/>
)
}

export default App
{/* <div id='main'> */}
{/* <div onClick={()=>setIsChat(p=>!p)} className='flex flex-cols border-double border-2 p-3 rounded-full items-center gap-10 mt-6 border-slate-500'> */}
  {/* <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={fg} alt="" /><div>zohru</div> */}
{/* </div> */}
{/* <div className='flex flex-cols border-double border-2 p-4 rounded-3xl items-center gap-10 mt-6 border-slate-500'> */}
  {/* <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={fg} alt="" /><div>zohra</div> */}
{/* </div> */}
{/* <div className='flex flex-cols border-double border-2 p-4 rounded-3xl items-center gap-10 mt-6 border-slate-500'> */}
  {/* <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={fg} alt="" /><div>zohrii</div> */}
{/* </div> */}
{/* <div className='flex flex-cols border-double border-2 p-4 rounded-3xl items-center gap-10 mt-6 border-slate-500'> */}
  {/* <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={fg} alt="" /><div>bestu</div> */}
{/* </div> */}
{/* <div className='flex flex-cols border-double border-2 p-4 rounded-3xl items-center gap-10 mt-6 border-slate-500'> */}
  {/* <img className='rounded-full border-2 border-solid border-slate-700 w-10' src={fg} alt="" /><div>home</div> */}
{/* </div> */}
{/*    */}
{/* </div> */}




{/* {isChat?<Chat  */}
// 
// goBack={()=>goBack()}
{/* />:''} */}