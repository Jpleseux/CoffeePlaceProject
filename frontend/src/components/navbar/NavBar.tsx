import "./navbar.css"
import { Link } from "react-router-dom"
import {FaUser, FaBookmark} from "react-icons/fa"
import {BsTelephoneFill} from "react-icons/bs"
import {useState} from "react"
import { useEffect, useContext } from "react"
import Cookies from "js-cookie"
import CookieFactory from "../../utils/CookieFactory"
import { GatewayContext } from "../../gateway/gatewayContext"
import {MdWorkspacePremium} from "react-icons/md"
function NavBar(){
    const [logged,setLogged ] = useState(false)
    const excludeRoutes = ["/signup", ]

    const [user, setUser] = useState({})
    const [notification,setNotification] = useState<any[]|undefined>([])
    const [newNotification, setNewNotification]= useState(0)
    if(excludeRoutes.includes(location.pathname)){
        return null
    }

    const gatewayContext = useContext(GatewayContext);
    const notificationGateway = gatewayContext?.notificationGateway;
    useEffect(() => {
      async function fetchData() {
          const response = await notificationGateway?.getByUserName(user.nameUser);
          setNotification(response?.response);
          const newNotificationsCount = (response?.response || []).reduce((count, notification) => {
              if (notification.isNewNotification) {
                  return count + 1;
              }
              return count;
          }, 0);
          setNewNotification(newNotificationsCount);
      }
      if (user.nameUser) {
          fetchData();
      }
  }, [notificationGateway, user.nameUser]);
  useEffect(() => {
    const userResponse = Cookies.get("userData");

    if (userResponse) {
        try {
            const userDataObj = JSON.parse(userResponse);
            setUser(userDataObj);
            CookieFactory.verifyToken(Cookies.get("jwttoken"), gatewayContext)
                .then((response) => {
                    if (response.done === false) {
                        setLogged(false);
                    } else {
                        setLogged(true);
                    }
                })
                .catch((error) => {
                    console.error("Erro ao verificar o token:", error);
                });
        } catch (error) {
            console.error("Erro ao fazer parse do JSON:", error);
        }
    } else {
        setUser({ nameuser: "Usuario anônimo" });
    }
}, [gatewayContext]); 

    return(
        <div>
            <nav className="nav-1">
            <Link to="/home" id="logoUrl">
                <img src="../../public/images/coffeeplacemini.png" alt="coffeplace" id="logo"/>
                Coffee Place
            </Link>            
            <Link to={"/complaint/"+user.email} id="logoUrl" className="search">
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
                /* @ts-ignore */
                <Link to={`/saller/individual/${user.nameUser}`}>
                    <div className="user-dash">
                        <img className="avatar" src={localStorage.getItem("avatar")||"../../public/images/user.png"} alt="avatar" />
                        {/* @ts-ignore */}
                        <p>Olá: {user.nameUser}</p>
                    </div>
                </Link>
            }
            {logged&&user.isPremium ===false&&
                <Link to={"/buy/account/"+user.email}>
                    < MdWorkspacePremium/>Comprar conta premium
                </Link>
            }
        </nav>
        <nav className="nav-2">
            <FaBookmark id="logo"/>

            <Link to="/product/all"><p>Produtos</p></Link>

            <Link to="/user/all"><p>Vendedores</p></Link>
            {/* @ts-ignore */}
            <Link to={`/chats/${user.nameUser}`}>
                <p>Canais</p>
            </Link>
            {/* @ts-ignore */}
            <Link id="especial" to={"/notifications/"+user.nameUser}>
                <p>Notificações & Detalhes dos pedidos</p>
                {/* @ts-ignore */}
                
                {newNotification >0&&
                    <span className="notification-badge">{newNotification}</span>
                }
            </Link>

        </nav>
        </div>
    )
}

export default NavBar