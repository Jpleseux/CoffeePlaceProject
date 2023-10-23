import { useState, useEffect, useContext } from "react"
import { GatewayContext } from "../../gateway/gatewayContext"
import { useParams } from "react-router"
import Input from "../../components/forms/Input"
import Message from "../../components/interface/Message"
import "../../../public/layouts/ComplaintPage.css"
function BuyPremiumAcount(){
    const gatewayContext = useContext(GatewayContext);
    const emailGateway = gatewayContext?.emailGateway;
    const {emailId} = useParams();
    const [email, setEmail] = useState({})
    const [message, setMessage] = useState({msg:"", done:true});
    const [isSubmitting, setIsSubmitting] = useState(false);
    async function submit(e:any){
        setIsSubmitting(true)
        e.preventDefault();
        // @ts-ignore
        const response = await emailGateway?.sendComplaint(emailId, email)
        setMessage(response);
        setTimeout(()=>{
            setIsSubmitting(false)
        }, 2000)
    }
    async function handleOnChange(e:any) {
        const { name, value } = e.target;
        setEmail((prevState) => ({ ...prevState, [name]: value }));
    }

    return(
        <div className="complaint-container">
            {message&&<Message msg={message.msg} timers={5000} type={message.done}/>}
            <h3>Ao comprar a conta premium os seus produtos tem maior destaque na plataforma: 
            </h3>
            <p>Para comprar envie uma mensagem abaixo, os administradores te responderão por email assim que puderem</p>
            <form onSubmit={submit}>
                <Input handleOnChange={handleOnChange} placeholder="Digite a mensagem da sua requisição" name="title" type="text"></Input>
                <textarea className="textarea-sign-up" name="msg" placeholder="Digite sua mensagem" onChange={handleOnChange}>

                </textarea>

                <button type="submit" disabled={isSubmitting} className="button-next">Enviar reclamação</button>
            </form>
        </div>
    )
}
export default BuyPremiumAcount