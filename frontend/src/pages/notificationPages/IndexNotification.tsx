import React, { useState, useContext, useEffect } from "react";
import { GatewayContext } from "../../gateway/gatewayContext";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "../../../public/layouts/Notification.css"
function IndexNotification() {
  const { id } = useParams();
  const gatewayContext = useContext(GatewayContext);
  const notificationGateway = gatewayContext?.notificationGateway;
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({});

  async function getNotifications() {
    try {
      const response = await notificationGateway?.getByUserName(id);
      setNotifications(response?.response || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }

  async function getUsers() {
    try {
      const userResponse = await Cookies.get("userData");
      const userDataObj = JSON.parse(userResponse);
      setUser(userDataObj);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  async function SetNotifications(){
    const ids:any = [];
    await notifications.map((notification) =>{
      // @ts-ignore
      ids.push(notification._id)
    })
    await notificationGateway?.setNotifications(ids);
  }
  async function deleteNotification(idNotification:string) {
    const response = await notificationGateway?.delete(idNotification);
    console.log(response)
  }

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    if (notifications.length > 0) {
      SetNotifications();
    }
  }, [notifications, id]);
  
  return (
    <div>
    {id === user.nameUser&&
            <div className="notification-container">
            {notifications.length > 0 &&
              notifications.map((notification) => (
                <div key={notification._id} className="notification"> 
                  <p>{notification.msgNotification}</p>
                  {notification.order &&
                    <div>
                          {/* @ts-ignore */}
                          <h5>{notification.order.product[0].nameProduct}</h5>
                          {/* @ts-ignore */}
                          <img src={notification.order.product[0].imageProduct} alt={notification.order.product[0].nameProduct} />
    
                          {/* @ts-ignore */}
                          <p>O valor de cada produto é {notification.order.product[0].productValue} R$ e o total da compra é: {notification.order.product[0].productValue * notification.order.amount} R$</p>
                    </div>
                  }              
                  {notification.chat !==undefined &&
                    <Link className="notification-button" to={`/chat/${notification.chat}`}>
                      <button>Clique para ir até o chat de compras</button>
                    </Link>
                  }
                  {user.typeUser.isSalesman !== true ||user.typeUser.isAdmin === true  &&
                    <button onClick={()=>deleteNotification(notification._id)} className="button-delete">Apagar Notificação</button>
                  }
                </div>
              ))}
              {notifications.length <= 0&&
                <h1>Nenhuma notificação para o senhor</h1>
    
              }
    
          </div>
    }
    {id !== user.nameUser&&
      <h1>Esse chat não é seu, o senhor não tem acesso</h1>
    }
    </div>
  );
}

export default IndexNotification;
