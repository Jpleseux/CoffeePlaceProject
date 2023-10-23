import "../../../public/layouts/signup.css"
import Input from "../../components/forms/Input";
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { GatewayContext } from "../../gateway/gatewayContext";
import {AiFillDollarCircle} from "react-icons/ai"
import {FaShoppingCart} from "react-icons/fa"
import { Link } from "react-router-dom"
import {BsBoxArrowLeft, BsBoxArrowRight} from "react-icons/bs"
import Message from "../../components/interface/Message";
import {FaRegUserCircle} from "react-icons/fa"
import Cookies from "js-cookie";
import CookieFactory from "../../utils/CookieFactory";

function SignUp(){
    const gatewayContext = useContext(GatewayContext);
    const navigate = useNavigate()
    const userGateway = gatewayContext?.userGateway;

    const [TypeUser, setTypeUser] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] =useState({
        name: null, age:null, email: null, password:null, 
        indentification:null, description:null, customField:null, city:null,
        state:null,neighborhood: null, cep:null, street:null, cpf:null, cnpj: null,
        complement: null, birth: null, avatar: "../../public/images/user.png"
    })

    const [image, setImage] =useState("")

    const [pages, setPage] =useState(1)
    const [message, setMessage] = useState({msg:"", done:true})

    useEffect(()=>{
        if(pages <=0){
            setPage(1)
        };

        if(pages >3){
            setPage(3)
        }
        if(pages ===3){

            const logo = document.getElementById("logo")
            const buttons = document.getElementById("buttons")
            const title = document.getElementById("title")
            const part1 = document.getElementById("left")
            const part2 = document.getElementById("right")
            if(buttons){
                buttons.style.gap = "160%"
            }
            if(logo){
                logo.style.display = "flex"
            }
            if(title){
                title.style.display = "none"
            
            }
            if(part1){
                part1.style.width = "100%"
            }
            if(part2){
                part2.style.display = "none"
            }
        }
        if(pages !== 3){
            const buttons = document.getElementById("buttons")
            const title = document.getElementById("title")
            const part1 = document.getElementById("left")
            const part2 = document.getElementById("right")
            if(buttons){
                buttons.style.gap = "50%"
            }
            if(title){
                title.style.display = "flex"
                title.textContent = "Cadastro"
                title.style.fontSize = "600%"
            }
            if(part1){
                part1.style.width = "50%"
            }
            if(part2){
                part2.style.display = "flex"
            }
        }

    }, [pages])

    async function handleOnChange(e:any) {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    }
   async function handleOnImage(e:any){
    const file = e.target.files[0]

    if(file){
        const reader = new FileReader()
        
        reader.onload = (event)=>{
            const image64 = event.target?.result;
            // @ts-ignore
            setImage(image64)
        }
        reader.readAsDataURL(file);
    }

   }

    async function submit(e:any) {
        setIsSubmitting(true)
        e.preventDefault()
        if(Cookies.get("userData")){
          Cookies.remove("userData")
        }
        if(Cookies.get("jwttoken")){
            Cookies.remove("jwttoken")
        }

        const birth= new Date(user.birth || "").getFullYear();

        const today = new Date().getFullYear()
        // @ts-ignore
        const age = today - birth

        if(TypeUser === "buyer"){
            const jsonUser ={
                name: user.name, 
                avatar: image,
                age: age,
                password: user.password,
                email: user.email,
                indentification: {cpf: user.cpf},
                description: user.description,
                field: {isBuyer: true},
                endereco: {
                    street: user.street,
                    state: user.state,
                    city: user.city,
                    neighborhood: user.neighborhood,
                    cep: user.cep
                }
            }
            localStorage.setItem("avatar", jsonUser.avatar);
<<<<<<< HEAD
            const cookieInput = {nameUser: jsonUser.name, typeUser: jsonUser.field, address:jsonUser.endereco,  email:jsonUser.email};
=======
            const cookieInput = {nameUser: jsonUser.name, typeUser: jsonUser.field};
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
            const Input = JSON.stringify(cookieInput);
            await CookieFactory.cookieUtil("userData",Input );
            const response = await userGateway?.signUp(jsonUser);
            await CookieFactory.cookieUtil("jwttoken", response.token)
            
            setMessage(response)
            if(response.done ===true){
                setTimeout(()=>{
                    navigate("/home")
                }, 2000)
            }
<<<<<<< HEAD
        }
        if(TypeUser === "salesman"){
            const jsonUser ={
                name: user.name, 
                avatar: image,
                age: age,
                password: user.password,
                email: user.email,
                indentification: {cnpj: user.cnpj},
                description: user.description,
                field: {isSalesman: true},
                endereco: {
                    street: user.street,
                    state: user.state,
                    city: user.city,
                    neighborhood: user.neighborhood,
                    cep: user.cep
                }
            }
            localStorage.setItem("avatar", jsonUser.avatar);
            const cookieInput = {nameUser: jsonUser.name, typeUser: jsonUser.field};
            const Input = JSON.stringify(cookieInput);
            await CookieFactory.cookieUtil("userData",Input );
            const response = await userGateway?.signUp(jsonUser);
            await CookieFactory.cookieUtil("jwttoken", response.token)
            setIsSubmitting(false)
            setMessage(response);
            if(response.done ===true){
                setTimeout(()=>{
                    navigate("/home")
                }, 2000)
            }
        }
=======
            
        }


>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
    }
    async function defineTypeUser(TypeUser:string) {
        setTypeUser(TypeUser)
    }
    async function definePage(page:number) {
        const numPage = pages + page
        setPage(numPage)
    }

    return(
        <div className="form-login">
            {TypeUser === ""&& 
                <div className="option-login title-logo-container">
                <Link to="/"><button className="button-back-page">Voltar</button></Link>
                <img className="logo" src="../../public/images/coffeeplacemini.png" alt="Coffee Place" />
                
                <div className="title"><p>Coffee Place</p></div>

                <h1 className="title-2">ESCOLHA O TIPO DE CONTA</h1>
                <div className="card-container">
                    <div className="card-left" onClick={()=> defineTypeUser("salesman")}>
                        <AiFillDollarCircle/>
                        <h2>Vendedor</h2>
                        <p>
                        <p>Uma conta do tipo VENDEDOR tem acesso a interface de vendas, perfil próprio 
                        e possibilidade de vender seus produtos com uma taxa acessível e planos favoráveis.</p>
                        </p> 
                    </div>
                    <div className="card-right" onClick={()=> defineTypeUser("buyer")}>
                    <FaShoppingCart />
                        <h2>Comprador</h2>
                        <p>
                        Uma conta do tipo COMPRADOR tem acesso a uma gama variada de produtos, interface de avaliação 
                        e interface para contato com seus produtores favoritos de forma totalmente gratuita.
                        </p>
                    </div>
                </div>
            </div>
            }
            <div id="right" className="split right-side-s">
               
            </div>
            <div id="left" className="split left-side-s">
            {TypeUser !=="" &&
                <div>
                   {pages === 1 &&
                    <button onClick={()=>setTypeUser("")} className="button-back-page">Voltar</button>
                    }
                    <form className="form-signup" onSubmit={submit}>
                    <div id="logo" className="">
                    <img className="logo-mini" src="../../public/images/coffeeplacemini.png" alt="Coffee Place" />
                    <div className="title-logo">Coffee Place</div>
                    </div>
                    <p id="title" className="form-title">Cadastro</p>
                    {pages ===3 && <p className="form-title-final">Sobre você</p>}
                    {message && <Message msg={message.msg} type={message.done} timers={3000}/>}
                        {pages === 1 &&
                        <div className="container">
                            <Input name="email"  type="email"handleOnChange={handleOnChange} placeholder="Digite seu Email" value={user.email||""}/>
                            {TypeUser === "buyer" &&
                                <Input name="cpf"  type="text"handleOnChange={handleOnChange} placeholder="Digite seu cpf" value={user.cpf||""}/>
                            }
                            {TypeUser === "salesman" &&
                                <Input name="cnpj"  type="text"handleOnChange={handleOnChange} placeholder="Digite seu cnpj" value={user.cnpj||""}/>
                            }
                            <Input name="password" type="password" handleOnChange={handleOnChange} placeholder="Digite sua senha" value={user.password||""}/>
                        </div>
                        }
                        {pages === 2 &&
                            <div className="main">
                            <div className="container-address-1">
                                <Input name="street" type="text" handleOnChange={handleOnChange} placeholder="Digite sua rua"  value={user.street||""}/>
                                <Input name="neighborhood" type="text" handleOnChange={handleOnChange} placeholder="Digite seu bairro" value={user.neighborhood||""}/>
                            </div>
                            <div className="container-address-2">
                                <Input name="cep" type="text" handleOnChange={handleOnChange} placeholder="Cep" value={user.cep||""}/>
                                <Input name="city" type="text" handleOnChange={handleOnChange} placeholder="Cidade" value={user.city||""}/>
                                <Input name="state" type="text" handleOnChange={handleOnChange} placeholder="UF" value={user.state||""}/>
                            </div>
                            <div className="container-address-3">
                                <Input name="complement" type="text" handleOnChange={handleOnChange} placeholder="Complemento" value={user.complement||""}/>
                            </div>
                            </div>
                        } 
                    {pages === 3 &&
                    <div className="bio-form">
                        
                            
                        <div className="card-avatar">
                            <FaRegUserCircle />
                            <label className="label-file" htmlFor="avatar"><p>Adicionar foto</p></label>
                            <Input name="avatar"  type="file" handleOnChange={handleOnImage} />

                        </div>
                        <Input name="name"  type="text" handleOnChange={handleOnChange} placeholder="Seu nome" value={user.name ||""}/>
                        <div className="date">
                            <p className="des">Selecione o ano em que nasceu</p>
                            <Input name="birth" type="date" handleOnChange={handleOnChange} value={user.birth ||""}/>
                        </div>
                        <textarea className="textarea-sign-up" name="description" placeholder="Uma descrição sobre você" onChange={handleOnChange} value={user.description ||""} >

                        </textarea>
                    </div>
                    }
                       <div id="buttons" className="buttons">
                       {pages > 1 &&
                            <button type="button" onClick={()=> definePage(-1)} className="button-back"><BsBoxArrowLeft/>  <p>Voltar</p></button>
                        }
                        {pages <3 &&
                            <button type="button" onClick={()=> definePage(1)} className="button-next"><p>Próxima</p> <BsBoxArrowRight/></button>
                        }
                        {pages ===3&&
                            <button type="submit" className="button-next" disabled={isSubmitting}><p>cadastrar</p> <BsBoxArrowRight/></button>
                        }
                       </div>
                </form>
                </div>
                }
            </div>
        </div>
    )
}
export default SignUp