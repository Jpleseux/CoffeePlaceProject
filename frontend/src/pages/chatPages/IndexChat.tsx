import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { GatewayContext } from "../../gateway/gatewayContext";
import Cookies from "js-cookie";
import Message from "../../components/interface/Message";
import { io, Socket } from "socket.io-client";
import "../../../public/layouts/IndexChat.css"
import Input from "../../components/forms/Input";
import ProductCard from "../../components/cards/productCard/productCard";
function IndexChat() {
  const gatewayContext = useContext(GatewayContext);
  const chatGateway = gatewayContext?.chatGateway;
  const messageGateway = gatewayContext?.messageGateway;
  const orderGateway = gatewayContext?.orderGateway
  const { id } = useParams<{ id: string }>();
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chat, setChat] = useState({});
  const [msg, setMsg] = useState({});
  const [user, setUser] = useState({});
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({})

  async function getChat() {
    try {
      const response = await chatGateway?.getOne(id);
      if (response) {
        setChat(response.response);
      } if (!response || response.done === false) {
        window.location.href = '/home';
      }
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  }
  async function getOrder(id:string){
      const response = await orderGateway?.getOne(id);
      // @ts-ignore
      setOrder(response.response)
    }
  async function getUser() {
    const userResponse = await Cookies.get("userData");
    if (userResponse) {
      const userDataObj = JSON.parse(userResponse);
      setUser(userDataObj);
    }
  }

  async function getMessages() {
    const response = await messageGateway?.getByChat(id);
    // @ts-ignore
    setMessages(response.output);
    // @ts-ignore
    setProduct(response.output[0].order.product[0])
    // @ts-ignore
    await getOrder(response.output[0].order._id)
  }

  useEffect(() => {
    getChat();
    getUser();
    getMessages();
  }, [id]);
  useEffect(() => {
    // @ts-ignore
    if (chat && user && chat.chatMembers && user.nameUser) {
      // @ts-ignore
      const isChatMember = chat.chatMembers.some(member => member.nameUser === user.nameUser);
      if (isChatMember === false) {
        setMsg({ msg: "Você não é autorizado a estar nesse chat", done: false });
        setTimeout(() => {
          window.location.href = '/home';
        }, 3000);
      } else {
        setShow(true);
      }
    }
  }, [chat, user]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("reciveMessage", async message => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
      socket.on("confirmState", async (message: any) => {
        await setMsg(message);
      });
    }
  }, [socket]);

  async function sendMessage(e: any) {
    e.preventDefault();
    // @ts-ignore
    const newMessage = { typeMsg: "normal", message: chatMessage, nameSender: user.nameUser, chat: id };
    const input = document.getElementById("input");
    // @ts-ignore
    input.value = ""
    socket?.emit("new-message", newMessage);
  }

  async function handleOnChange(e: any) {
    const { value } = e.target;
    setChatMessage(value);
  }
  async function handleOnChangeOrderId(e:any) {
    const { value } = e.target;
    setOrderId(value);
  }

  async function confirmOrder(nameBuyer: string, nameSaller: string, idOrder:any) {
    // @ts-ignore
    socket?.emit("confirmOrder", nameBuyer, nameSaller, id, idOrder);
    setTimeout(() => {
      window.location.href = '/home';
    }, 3000);
  }

  async function cancelOrder(idOrder: string, buyer:string) {
    // @ts-ignore
    socket?.emit("cancelOrder", idOrder, id,buyer );
    setTimeout(() => {
      window.location.href = '/home';
    }, 3000);
  }
  async function submit(e:any) {
    setIsSubmitting(true);
    e.preventDefault();
    socket?.emit("finalizePurchase", orderId);
    setTimeout(() => {
      setIsSubmitting(false)
    }, 3000);
  }

  return (
    <div className="chatIndexLocation">
      {/* @ts-ignore */}
      <Message msg={msg.msg} timers={2000} type={msg.done} />
      {show === true &&
        <div>
          {/* @ts-ignore */}
          {chat.typeChat === "normal"&&
            <div>
            {messages.length >0&&
              <div>
                  {messages.length !=0 && user.typeUser.isSalesman ===true&&order.isFinished ===false&&order.isRated !==true&&
                  <form onSubmit={submit} >
                    {/* @ts-ignore */}
                    <div className="finished-order">
                      <Input handleOnChange={handleOnChangeOrderId} name="orderid" type="text" placeholder="Digite aqui o codigo de finalização" text="Digite aqui o codigo de finalização para finalizar a compra."/>
                      <button className="button-next" disabled ={isSubmitting}>
                      {isSubmitting? "Finalizando....":"Enviar"}
                      </button>
                    </div>
                  </form>
                }
                {product &&user.typeUser.isBuyer===true&&order.isFinished ===true&&order.isRated ===false&&
                  // @ts-ignore
                  <ProductCard amount={product.amount} idProduct={product._id} imageProduct={product.imageProduct} nameProduct={product.nameProduct} nameUser={"nameSalesman"} productAvaliation={product.productAvaliation} productValue={product.productValue} key={product._id}/>
                }
              </div>
            }
            {chat &&
            <div className="IndexChat">
              <div className="input-container">
                <form onSubmit={sendMessage}>
                  <input id="input" type="text" name="msg" onChange={handleOnChange} />
                  <button type="submit">Enviar</button>
                </form>
              </div>
              <div className="body-chat" id="body-chat">
                {messages.length !== 0 &&
                  <div>
                    {messages.slice().reverse().map((message, index) => (
                      <div>
                        {message.typeMsg === "normal"&&
                          // @ts-ignore
                          <div key={index} className={`bubble ${message.nameSender === user.nameUser ? 'sender' : 'receiver'}`}>   
                            <strong>{message.nameSender}: </strong>
                            {message.message}
                          </div>
                        }
                        {/* @ts-ignore */}
                        {message.typeMsg === "order"&& user.typeUser.isBuyer ===true&&
                          <p>{message.message}</p>
                        }
                        {message.typeMsg === "order"&& order.isFinished ===true && 
                          <h4>O pedido foi finalizado, o chat ainda está berto, e o comprador pode avaliar o produto.</h4>
                        }
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>}
            </div>
          }
          {!chat &&
            <Message msg={"Nenhum chat encontrado com id igual a " + id} timers={6000} type={false} />
          }
          {/* @ts-ignore */}
          {chat.typeChat === "order"&&
          <div>
          {messages.length !== 0 &&
            <div className="body-msgs">
              {messages.map((message) => {
                if (message.typeMsg === "order") {
                  return (
                    <form key={message._id} className="order-message">
                      {/* @ts-ignore */}
                      <h1>{message.message}</h1>
                      {/* @ts-ignore */}
                      <p>O pedido vem do comprador:{message.nameSender}</p>
                      {/* @ts-ignore */}
                      <p>O produtor reside em: {message.order.buyer.addressBuyer.city}/{message.order.buyer.addressBuyer.state}</p>
                      {/* @ts-ignore */}
                      <p>O Produto tem {message.order.product[0].amount} itens em estoque</p>
                      <p>O produto que foi comprado é:</p>
                      {/* @ts-ignore */}
                      <h5>{message.order.product[0].nameProduct}</h5>
                      {/* @ts-ignore */}
                      <img src={message.order.product[0].imageProduct} alt={message.order.product[0].nameProduct} />

                      {/* @ts-ignore */}
                      <p>O valor de cada produto é {message.order.product[0].productValue} R$ e o total da compra é: {message.order.product[0].productValue * message.order.amount} R$</p>
                      {console.log(message.order)}
                      <button type="button" className="confirm" onClick={() => confirmOrder(message.nameSender, message.order.saller, message.order._id)}>
                        Clique para confirmar a compra
                      </button>
                      <button type="button" className="cancel" onClick={() => cancelOrder(message.order._id,message.nameSender)}>
                        Clique aqui para cancelar a compra
                      </button>
                    </form>
                  );
                }
                return null;
              })}
            </div>
          }
          </div>
          }
        </div>
      }
    </div>
  );
}

export default IndexChat;
