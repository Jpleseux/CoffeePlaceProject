import { useState,useEffect } from "react"
import "./message.css"

function Message({msg, timers, type}:any){

    const [visible, setVisible] = useState(false)

    useEffect(()=>{
        if(!msg){
            setVisible(false)
            return
        }
            setVisible(true)
            const timer = setTimeout(()=>{
                setVisible(false)
            }, timers)
            return()=>clearTimeout(timer)
    }, [msg])

    return (
        <>
           {visible &&(
            <div className={`message ${type}`}>
                {msg}
            </div> 
           )

           } 
        </>
    )
}
export default Message