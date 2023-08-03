import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie"
import CookieFactory from "../utils/CookieFactory";
import { GatewayContext } from "../gateway/gatewayContext";
import Message from "../components/interface/Message";

function Home(){
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate()
    const gatewayContext = useContext(GatewayContext);
    async function verifyToken(){
      const response = await CookieFactory.verifyToken(Cookies.get("jwttoken"),gatewayContext)
      setMessage(response.msg);
      if(response.done ===false){
        setTimeout(()=>{
            navigate('/')
        },5000)
      }else{
        setTimeout(()=>{
          navigate("/home")
        },4000)
      }
    }
    useEffect(()=>{
      verifyToken()
    })
    return(
        <div>
            <h1>Home</h1>
            {message&&<Message msg={message} timers={5000}/>}
        </div>
    )
}

export default Home