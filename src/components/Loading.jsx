import React from 'react';
import ReactDOM from 'react-dom';
import { useState ,useEffect, useRef} from 'react'

export default function Loading(props){
   
        return ReactDOM.createPortal(
            // <div className=" flex items-center justify-center z-10" >
              <div className='fixed inset-5 text-white w-full h-full z-10 flex items-center justify-center bg-transparent'>
                <button type="button" className="bg-indigo-500 flex justify-center items-center flex-col rounded-lg p-2" disabled>
                <svg  className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 15a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Zm10-5a1 1 0 0 1-1 1h-3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1ZM7 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1Zm12.071 7.071a1 1 0 0 1-1.414 0l-2.121-2.121a1 1 0 0 1 1.414-1.414l2.121 2.12a1 1 0 0 1 0 1.415ZM8.464 8.464a1 1 0 0 1-1.414 0l-2.12-2.12a1 1 0 0 1 1.414-1.415l2.12 2.121a1 1 0 0 1 0 1.414ZM4.93 19.071a1 1 0 0 1 0-1.414l2.121-2.121a1 1 0 0 1 1.414 1.414l-2.12 2.121a1 1 0 0 1-1.415 0ZM15.536 8.464a1 1 0 0 1 0-1.414l2.12-2.121a1 1 0 1 1 1.415 1.414L16.95 8.464a1 1 0 0 1-1.414 0Z"/></svg>
                  loading...
                </button>
              </div>
            // </div>
            ,
            props.div.current
        )
}
