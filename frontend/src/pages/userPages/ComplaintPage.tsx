import { useState, useEffect, useContext } from "react"
import { GatewayContext } from "../../gateway/gatewayContext"
import { useParams } from "react-router"
import Input from "../../components/forms/Input"
import Message from "../../components/interface/Message"
import "../../../public/layouts/ComplaintPage.css"
function ComplaintPage(){
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
            <h3>O senhor(a) deseja fazer alguma reclamação, escreva abaixo sua reclamação e um administrador vai receber sua notificação
            </h3>
            <form onSubmit={submit}>
                <Input handleOnChange={handleOnChange} placeholder="Digite o motivo da sua reclamação" name="title" type="text"></Input>
                <textarea className="textarea-sign-up" name="msg" placeholder="Explique o motivo da sua reclamação" onChange={handleOnChange}>

                </textarea>

                <button type="submit" disabled={isSubmitting} className="button-next">Enviar reclamação</button>
            </form>
        </div>
    )
}
export default ComplaintPage