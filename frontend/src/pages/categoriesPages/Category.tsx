import "../../../public/layouts/Category.css"
import Input from "../../components/forms/Input"
import { useState, useEffect, useContext } from "react";
import { GatewayContext } from "../../gateway/gatewayContext";
import Message from "../../components/interface/Message";
import { Link } from "react-router-dom";
function Category(){
    const gatewayContext = useContext(GatewayContext)
    const categoryGateway = gatewayContext?.categoryGateway;
<<<<<<< HEAD
    const [category, setCategory] = useState({})
    const [message, setMessage] = useState({msg:String,done:Boolean})
    const [isSubmitting, setIsSubmitting] = useState(false)
    async function submit(e:any) {
        setIsSubmitting(true)
=======

    const [category, setCategory] = useState({})
    const [message, setMessage] = useState({msg:String,done:Boolean})
    async function submit(e:any) {
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
        e.preventDefault();
        const response = await categoryGateway?.save(category);
        setMessage(response)
        setTimeout(()=>{
            window.location.href = "/category/create"
        }, 3000)
    }

    async function handleOnChange(e:any) {
        const { name, value } = e.target;
        setCategory((prevState) => ({ ...prevState, [name]: value }));
    }

    return(
        <div className="category-form-body">
            <Message msg={message.msg} type={message.done} timers={3000}/>
            <h1>Cadastro de categorias</h1>
            
            <form onSubmit={submit} >
                <Input name="nameCategory" type="text" handleOnChange={handleOnChange}placeholder="Nome categoria"/>
                <textarea onChange={handleOnChange} name="descriptionCategory" placeholder="Coloque uma descrição sbre essa categoria">
                </textarea>
               <div className="buttons">
                    <Link to="/home"><button id="back-cg" className="button-back">Voltar para pagina inicial</button>
</Link>
<<<<<<< HEAD
                    <button className="button-next" type="submit" disabled={isSubmitting}>        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
=======
                    <button className="button-next" type="submit">cadastrar</button>
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
               </div>
            </form>
        </div>
    )
}

export default Category