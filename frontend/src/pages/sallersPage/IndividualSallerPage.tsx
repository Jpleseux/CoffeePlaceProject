import { useParams } from "react-router"
import {useEffect, useState, useContext} from "react"
import { GatewayContext } from "../../gateway/gatewayContext";
import "../../../public/layouts/IndividualSallerPage.css"
<<<<<<< HEAD
import ProductCard from "../../components/cards/productCard/productCard";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Message from "../../components/interface/Message";
function IndividualSallerPage(){
    const gatewayContext =  useContext(GatewayContext);
 
    const userGateway =  gatewayContext?.userGateway
    const productGateway = gatewayContext?.productGateway
    const {name} = useParams();

    const [user, setUser]= useState<{}| false>({_id:"",name:"",age:0, avatar:"", email:"", description:"", endereco:{city:"", state:"", neighborhood:"", cep:""}, field:{isAdmin:null, isBuyer:null, isSalesman:null}, indentification:{cpf:null} })
    const [products, setProducts] = useState([])
    const [actualUser,setActualUser ] = useState({})
    const [msg, setMsg]= useState({msg:"", done:null})

    async function getUser() {
        const response = await userGateway?.getUserByName(name);
        if(response.user === undefined){
            setUser(false)
        }else{        
            setUser(response.user.user)
        }
        // @ts-ignore
        const actualUserData = await Cookies.get("userData");
        if (actualUserData) {
          try {
            const actual = JSON.parse(actualUserData);
            console.log(actual.typeUser.isAdmin);
            setActualUser(actual);
          } catch (error) {
            console.error("Erro ao fazer parsing do JSON:", error);
          }
        } 

    } 
    async function getProduct() {
        // @ts-ignore
        const response = await productGateway?.getProductByName(name)
        // @ts-ignore
        await setProducts(response.output)  
    }
    async function confirmPromoteToPremium() {
        const confirmed = window.confirm("Deseja realmente promover este usuário para Premium?");
        if (confirmed) {
            // @ts-ignore
            const response = await userGateway?.setIsPremium(user.email)
            setMsg(response);
            if(response.done ===true){
                setTimeout(()=>{
                    window.location.href = location.pathname
                }, 3000)
            }
        }
      }
    
      async function confirmPromoteToAdmin() {
        const confirmed = window.confirm("Deseja realmente promover este usuário para Administrador?");
        if (confirmed) {
            // @ts-ignore
            const response = await userGateway?.setUserToAdmin(user.email)
            console.log(response)
            setMsg(response);
            if(response.done ===true){
                setTimeout(()=>{
                    window.location.href = location.pathname
                }, 3000)
            }  
        }
      }
    
      async function confirmDeleteUser() {
        const confirmed = window.confirm("Deseja realmente excluir este usuário?");
        if (confirmed) {
            // @ts-ignore
            const response = await userGateway?.delete(user.email)
            setMsg(response);
            console.log(response)
            if(response.done ===true){
                setTimeout(()=>{
                    window.location.href = "/home"
                }, 3000)
            }        
        }
      }
    useEffect(()=>{
        getUser();
        getProduct()
    // @ts-ignore
    }, [products.response])

    return(
    <div className="individual-store">      
        {user===false?(
                <h1>Vendedor não encontrado</h1>
        ):(
            <div>
        <div className="contact-card">
            {msg && <Message msg={msg.msg} type={msg.done} timers={3000}/>}  
            <img src={user.avatar} alt={user.name} />
            <h1>{user.name}</h1>
            <p>{user.endereco.city} {user.endereco.state}</p>
            <p>Email para contato: {user.email}</p>            
            <a href={"mailto:"+user.email} target="_blank">
                <span><button className="button-next">Entre em contato</button></span>
            </a>

            {/* @ts-ignore */}
            {actualUser.typeUser&&actualUser.typeUser.isAdmin ===true&&actualUser.name !==name&&
                <div className="button-container">
                    <button className="button-promote" onClick={confirmPromoteToPremium}>Conceder conta Premium</button>
                    <button className="button-promote" onClick={confirmPromoteToAdmin}>Promover para Administrador</button>
                    <button className="button-delete" onClick={confirmDeleteUser}>Excluir usuário</button>
                </div>
            }
        </div>
        {user&&actualUser.nameUser ===name&&
            <div className="sidebar">
                <ul className="nav-links">
                    {/* @ts-ignore */}
                    {actualUser.typeUser&&actualUser.typeUser.isSalesman === true&&
                        <Link to="/product/create"> <button className="button-next">Adicionar produto</button></Link>
                    }
                    {/* @ts-ignore */}
                    {actualUser.typeUser&&actualUser.typeUser.isAdmin === true&&
                        <Link to="/category/create"> <button className="button-next">Adicionar categoria</button></Link>
                    }
                </ul>
            </div>
        }
            <div className="container-address-2" id="sallers">
            {/* @ts-ignore */}
            {products.length>0 && products.map((product)=><ProductCard imageProduct={product.imageProduct} nameProduct={product.nameProduct} productAvaliation={product.productAvaliation} productValue={product.productValue} descriptionProduct={product.descriptionProduct} idProduct={product.idProduct} nameUser={product.nameSalesman} amount={product.amount} key={product.idProduct}/>)}
            </div>
            </div>
        )}
    </div>
    )
}
=======
function IndividualSallerPage(){
    const gatewayContext =  useContext(GatewayContext);

    const userGateway =  gatewayContext?.userGateway

    const {name} = useParams();

    const [user, setUser]= useState({name:"",age:0, avatar:"", email:"", description:"", endereco:{city:"", state:"", neighborhood:"", cep:""}, field:{isAdmin:null}, indentification:{cpf:null} })

    async function getUser() {
        const response = await userGateway?.getUserByName(name);
        setUser(response.user.user)
    }

    useEffect(()=>{
        getUser()
    }, [])

    return(
    <div className="individual-store">
        <div className="contact-card">
            <img src={user.avatar} alt={user.name} />

            <h1>{user.name}</h1>
            <p>{user.endereco.city} {user.endereco.state}</p>
            <p>Email para contato: {user.email}</p>
            
            <span><button className="button-next">Entre em contato</button></span>
        </div>
        <div className="sidebar">
            <ul className="nav-links">
                <li>Editar Perfil</li>
                <li>Services</li>
                <button className="button-next">Adicionar produto</button>
            </ul>
        </div>
    </div>
    )
}

>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
export default IndividualSallerPage