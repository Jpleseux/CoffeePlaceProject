import { GatewayContext } from "../../gateway/gatewayContext"
import { useState, useEffect, useContext } from "react"
import "../../../public/layouts/allSallersPage.css"
import { Link } from "react-router-dom";
function AllSallerPage(){
    const gatewayContext = useContext(GatewayContext);

    const userGateway = gatewayContext?.userGateway
    const [sallers, setSallers] =useState([])
    async function getSallers(){
        const response = await userGateway?.getAllSallers()
        setSallers(response.user)
    }
    useEffect(()=>{
        getSallers()
        console.log(sallers)
    }, [sallers])
    return(
        <div className="sallers">
            <div className="container-address-2">
        {sallers.length>0 && sallers.map((saller, index) => (
            <div key={index} className="card">
                <div className="card-border-top">
                </div>
                <div className="img">
                    {/* @ts-ignore */}
                    <img src={saller.avatar} alt={saller.name} />
                </div>
                {/* @ts-ignore */}
                <span> {saller.name}</span>
                <p className="job"> Vendedor</p>
                {/* @ts-ignore */}
                <p className="job">{saller.endereco.city} {saller.endereco.state}</p>
                {/* @ts-ignore */}
                <Link to={`/saller/individual/${saller.name}`}>                      
                <button>Acessar pagina do vendedor</button>
                </Link>
            </div>
        ))}
        </div>
        </div>
    )
}

export default AllSallerPage