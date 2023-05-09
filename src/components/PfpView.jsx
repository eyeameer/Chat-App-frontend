import React from "react";
import ReactDOM from 'react-dom'
import { useState ,useEffect, useRef} from 'react'
import CloseButton from "./CloseButton";
import test from '../assets/Screenshot_20230327_201324_Gallery.png'
 export default function PfpView(props){
    return ReactDOM.createPortal(
        <div className="flex justify-center  items-center bg-black fixed inset-1">
            <img src={props.photo} alt="" className="relative text-white h-1/2 " />
          <button onClick={props.changePfpView} className="absolute top-10 right-8 text-white"><CloseButton/></button>
        </div>
        ,
               props.div.current
    )
 }
