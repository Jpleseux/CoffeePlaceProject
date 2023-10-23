import Input from "../../components/forms/Input";
import { useState, useContext } from "react";
import { GatewayContext } from "../../gateway/gatewayContext";
import Message from "../../components/interface/Message";
import CookieFactory from "../../utils/CookieFactory";
import { useNavigate } from "react-router-dom";
import "../../../public/layouts/Login.css"
import {FcGoogle} from "react-icons/fc"
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const gatewayContext = useContext(GatewayContext);

  const navigate = useNavigate()
  const userGateway = gatewayContext?.userGateway;
  const emailGateway = gatewayContext?.emailGateway;
  const [user, setUser] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({msg:"", done:true});
  function handleOnChange(e: any) {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }
  async function changePassword() {
    // @ts-ignore 
    const response = await emailGateway?.changePassword(user.email)
    setMessage(response)
  }
  
  async function submitUser(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (Cookies.get("userData") !== undefined) {
      Cookies.remove("userData", { path: "/" });
    }
    if (Cookies.get("jwttoken") !== undefined) {
      Cookies.remove("jwttoken", { path: "/" });
    }
    console.log(user)
    const response = await userGateway?.login(user);
    console.log(response)
    setMessage(response);
  
    if (response.done) {
      CookieFactory.cookieUtil("jwttoken", response.token);
      const cookieInput = {
        nameUser: response.user.name,
        typeUser: response.user.field,
        address: response.user.endereco,
        email: response.user.email,
        isPremium:response.user.isPremium
      };
      console.log(response)
      localStorage.setItem("avatar", response.user.avatar);
      const input = JSON.stringify(cookieInput);
      CookieFactory.cookieUtil("userData", input);
      setTimeout(() => {
        window.location.href = "/home"
      },3000); 
    }
    if(!response){
      setIsSubmitting(true)
    }
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
              <button disabled={isSubmitting} className="submit" type="submit">Entrar</button>
            </div>

            {message.done ===false &&
            <div className="forgot">
              <button className="button-next" onClick={changePassword}>Esqueceu sua senha, ou deseja redefinir sua conta?</button>
            </div>
            }
            <div className="options">
            <h3>Não tem uma conta, cadastre-se!!!</h3>

            <Link to="/signup"><button className="button">Cadastre-se</button></Link>
          </div>
          </form>
      </div>
    </div>
  ); 
}

export default Login;