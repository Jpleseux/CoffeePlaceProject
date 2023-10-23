import { useParams } from "react-router"
import { useEffect, useState, useContext } from "react"
import CookieFactory from "../../utils/CookieFactory"
import { GatewayContext } from "../../gateway/gatewayContext";
import Input from "../../components/forms/Input";
import Message from "../../components/interface/Message";
function ChangePassword(){
    const [user, setUser] = useState({ password: "", email: "" });
    const { email } = useParams();
    const [logged, setLogged] = useState(false);
    const [token, setToken] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState({msg:"", done:null});
    const gatewayContext = useContext(GatewayContext);
    const userGateway = gatewayContext?.userGateway;
    async function verifyToken(e:any) {
        e.preventDefault();
        console.log(token)
        const response = await CookieFactory.verifyToken(token,gatewayContext);
        console.log(response)
        if(response.done === true){
            setLogged(true)
        }else{
            // @ts-ignore
            setMsg({msg:"O código não esta correto", done:false})
            setLogged(false)
        }
    }
    async function handleOnChangeCode(e:any) {
        const { value } = e.target;
        setToken(value);
    }
    async function handleOnChangePassword(e:any){
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    }
    async function changePassword(e:any) {
        e.preventDefault();
        const response = await userGateway?.modifyPassword(user)
        setMsg(response)
    }
    useEffect(()=>{
        // @ts-ignore
        setUser({ email: email + "@gmail.com" });
    }, [])
    return(
        <div>
            <Message msg={msg.msg} type={msg.done} timers={3000}/>
            {logged === false&&
                <form onSubmit={verifyToken}>
                    <Input handleOnChange={handleOnChangeCode} name="token" type="text" placeholder="Digite seu codigo"text="Digite seu codigo de redefinição de senha" />
                    <button type="submit" className="button-next">Enviar</button>
                </form>
            }
            {logged ===true&&
                <form onSubmit={changePassword}>
                    {/* @ts-ignore */}
                    <Input handleOnChange={handleOnChangePassword} name="email" type="text" placeholder="Digite seu email"text="Verifique se o email abaixo é o seu, ele sera o email usado para mudar a senha" value={user.email} />
                    <Input handleOnChange={handleOnChangePassword} name="password" type="text" placeholder="Digite sua senha"text="Coloque a senha para muda-lá:"/>
                    <button className="button-next" disabled={isSubmitting}>
                        {!isSubmitting? "Enviar":"Enviando...."}
                    </button>
                </form>
            }
        </div>
    )
}
export default ChangePassword