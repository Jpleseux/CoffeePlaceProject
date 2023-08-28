import { useLocation } from "react-router"
import "./navbar.css"
import { Link } from "react-router-dom"
import {BiSearchAlt} from "react-icons/bi"
import {FaUser, FaBookmark} from "react-icons/fa"
import {BsTelephoneFill} from "react-icons/bs"
import {useState} from "react"
import { useEffect, useContext } from "react"
import Cookies from "js-cookie"
import CookieFactory from "../../utils/CookieFactory"
import { GatewayContext } from "../../gateway/gatewayContext"
import {PiListFill} from "react-icons/pi"
 
function NavBar(){
    const [logged,setLogged ] = useState(false)
    const excludeRoutes = ["/signup", ]

    const [show, setShow] = useState(false)
    const [search, setSearch] =useState({})
    const [user, setUser] = useState({})
    if(excludeRoutes.includes(location.pathname)){
        return null
    }

    async function handleOnSearch(e:any) {
        const { name, value } = e.target;
        setSearch((prevState) => ({ ...prevState, [name]: value }));
    }
    function submit(e:any) {
        e.preventDefault()

        console.log(search)
    }
    const gatewayContext = useContext(GatewayContext);

    async function verifyToken() {
        const userResponse = await Cookies.get("userData"); 
        const response = await CookieFactory.verifyToken(Cookies.get("jwttoken"), gatewayContext);
        console.log(Cookies.get("userData"))
        if (response.done === false) {
          setLogged(false);
        } else{
          setLogged(true);
        //   @ts-ignore
          const userDataObj = JSON.parse(userResponse);
          setUser(userDataObj);
        }
      }
      
      useEffect(() => {
        setTimeout(()=>{
            verifyToken();
        }, 5000)
      },[]);

    return(
        <div >
            <nav className="nav-1">
            <Link to="/home" id="logoUrl">
                <img src="../../public/images/coffeeplacemini.png" alt="coffeplace" id="logo"/>
                Coffee Place
            </Link>
            {show === true&&
                <form className="form-search" onSubmit={submit} onMouseLeave={()=>setShow(false)}>
                    <input className="search-input" type="text" name="search" onChange={handleOnSearch}  placeholder="Pesquisar"/>

                    <button type="submit" >Pesquisar</button>
                </form>
            }
            {show === false&&
                <div id="logoUrl" className="search" onMouseEnter={()=>setShow(true)}>
                <BiSearchAlt id="logo"/>
                </div>
            }
            
            <Link to="#" id="logoUrl" className="search">
                <BsTelephoneFill id="logo"/>
                <p>Fale conosco</p>
            </Link>

            {logged === false&&
                <Link to="/" id="logoUrl" className="search">
                    <FaUser id="logo"/>
                    <p>Entrar ou cadastre-se</p>
                </Link>
            }
            {logged === true &&
                <div className="user-dash">
                    <img className="avatar" src={localStorage.getItem("avatar")||"../../public/images/user.png"} alt="avatar" />
                    {/* @ts-ignore */}
                    <p>Olá: {user.nameUser}</p>
                </div>
            }
        </nav>
        <nav className="nav-2">
            <FaBookmark id="logo"/>

            <Link to="#"><p>Produtos</p></Link>

            <Link to="#"><p>Vendedores</p></Link>

            <Link to="#"><p>Ofertas</p></Link>

            <PiListFill id="logo"/>

        </nav>
        </div>
    )
}

export default NavBar