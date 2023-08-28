import { useParams } from "react-router"
import {useEffect, useState, useContext} from "react"
import { GatewayContext } from "../../gateway/gatewayContext";
import "../../../public/layouts/IndividualSallerPage.css"
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

export default IndividualSallerPage