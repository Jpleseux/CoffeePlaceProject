import Input from "../components/forms/Input";
import { useState, useContext } from "react";
import { GatewayContext } from "../gateway/gatewayContext";
import Message from "../components/interface/Message";
import CookieFactory from "../utils/CookieFactory";
import { useNavigate } from "react-router-dom";
import "../../public/layouts/Login.css"
import {FcGoogle} from "react-icons/fc"
import { Link } from "react-router-dom";

function Login() {
  const gatewayContext = useContext(GatewayContext);

  const navigate = useNavigate()
  const userGateway = gatewayContext?.userGateway;
  const [user, setUser] = useState({});
  const [message, setMessage] = useState({msg:"", done:true});

  function handleOnChange(e: any) {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }
  
  async function submitUser(e: any) {
    e.preventDefault();
    const response = await userGateway?.login(user);
    setMessage(response);
    await CookieFactory.cookieUtil("jwttoken", response.token)
    const cookieInput = {nameUser: response.user.name, typeUser: response.user.field}
    localStorage.setItem("avatar", response.user.avatar)
    const Input = JSON.stringify(cookieInput)
    console.log(Input)
    await CookieFactory.cookieUtil("userData",Input );
    setTimeout(()=>{
      if(response.done ===true){
        navigate("/home")
      }
    },2000)
  }

  return (
    <div className="form-login">
      <div className="split left-side">
          <img src="../../public/images/coffee.png" alt="ilustração café" />
      </div>
      <div className="split right-side">
      {message&&<Message msg={message.msg} timers={5000} type={message.done}/>}
        <form className="form-login-begin" onSubmit={submitUser}>
          <p className="form-title">Coffee Place</p>
            <div className="container">
              <Input
                type="text"
                name="email"
                text=""
                placeholder="Escreva o seu Email"
                handleOnChange={handleOnChange}
              />
              <Input
                type="password"
                name="password"
                text=""
                placeholder="Escreva o sua senha"
                handleOnChange={handleOnChange}
              />
              <button className="submit" type="submit">Entrar</button>
            </div>

            {message.done ===false &&
            <div className="forgot">
              <a href="#">Esqueceu sua senha, ou deseja redefinir sua conta?</a>
            </div>
            }
            <div className="options">
            <h3>Não tem uma conta, cadastre-se!!!</h3>

            <Link to="/signup"><button className="button">Cadastre-se</button></Link>
            <span><FcGoogle/></span>
          </div>
          </form>
      </div>
    </div>
  );
}

export default Login;