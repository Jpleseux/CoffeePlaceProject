import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { GatewayContext } from "../../gateway/gatewayContext";
import Chat from "../../entity/Chat";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../../../public/layouts/UserChats.css";  

function UserChats() {
  const { id } = useParams();
  const gatewayContext = useContext(GatewayContext);
  const chatGateway = gatewayContext?.chatGateway;
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState({});

  async function getChats() {
    const response = await chatGateway?.getByUsers(id);
    console.log(response);
    // @ts-ignore
    if (response && response.response) {
      setChats(response.response);
    }
  }

  async function getUser() {
    const userResponse = await Cookies.get("userData");
    if (userResponse) {
      const userDataObj = JSON.parse(userResponse);
      setUser(userDataObj);
    }
  }

  useEffect(() => {
    getChats();
    getUser();
  }, [id]); 

  return (
    <div className="index-chat">
      {id === user.nameUser && (
        <div>
          {chats.length > 0 && (
            <div>
              <h1>Os chats que você está são:</h1>
              {chats.map((chat) => (
                <div key={chat._id} className="chat-item">
                  {chat.typeChat === "order" && (
                    <div>
                      <p className="chat-type">Chat de recebimento de compra</p>
                      <Link to={`/chat/${chat._id}`}>
                        <button className="chat-button">Acessar o chat</button>
                      </Link>
                    </div>
                  )}
                  {chat.typeChat === "normal" && (
                    <div>
                      <p className="chat-type">Chat de compra normal</p>
                      <Link to={`/chat/${chat._id}`}>
                        <button className="chat-button">Acessar o chat</button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {chats.length <= 0 && (
            <h1 className="no-chat-msg">Você não tem nenhum chat cadastrado!</h1>
          )}
        </div>
      )}
      {id !== user.nameUser && (
        <h1>Essa área de notificações não é sua, você não tem acesso.</h1>
      )}
    </div>
  );
}

export default UserChats;
