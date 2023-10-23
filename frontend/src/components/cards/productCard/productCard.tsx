import  { useState, useEffect, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import productCardInterface from "../../../../public/layouts/interfaces/ProductCardInterface";
import "./productCard.css";
import Cookies from "js-cookie";
import { GatewayContext } from "../../../gateway/gatewayContext";
import Message from "../../interface/Message";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Input from "../../forms/Input";
function ProductCard({ 
  nameUser,
  amount,
  nameProduct,
  productValue,
  imageProduct,
  productAvaliation,
  idProduct,
}: productCardInterface) {
  const gatewayContext = useContext(GatewayContext);
  const productGateway = gatewayContext?.productGateway;
  const [message, setMessage] = useState({ msg: "", done: false });
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [avaliation, setAvaliation] = useState(0);
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => {
    if(!Cookies.get("userData")){
      setUser("Anônimo")
    }else{
      // @ts-ignore
      setUser(JSON.parse(Cookies.get("userData")));
    }

  }, []);
  useEffect(() => {
    setIsChat(location.pathname === "/chat/" + id);
  }, [location.pathname, id]);

  useEffect(() => {

    // @ts-ignore
    if (!user || user.nameUser !== nameUser) {
      setShow(false);
    }
    // @ts-ignore
    if (user && user.typeUser) {
      if(user.typeUser.isAdmin === true||user.typeUser.isSalesman ===true){
        setShow(true)
      }
    }
  }, [user]);

  async function deleteProduct() {
    setShowConfirm(true);
  }
  async function handleConfirm() {
    setMessage(await productGateway?.delete(idProduct));
    setShowConfirm(false);
    setTimeout(() => {
        window.location.href = location.pathname;
    }, 1000); 
  }
  async function increase() {
    const input = document.getElementById("number-input") as HTMLInputElement;
        if (parseInt(input.value) >= 5|| parseInt(input.value) >= 5) {
          input.value = "5"
      } else {
          input.value = String(Number(input.value) + 1);
      }
      setAvaliation(parseInt(input.value));

}

async function decrease() {
    const input = document.getElementById("number-input") as HTMLInputElement;
    if (parseInt(input.value) <= 0|| parseInt(input.value) <= 0) {
        input.value = "0"
    } else {
        input.value = String(Number(input.value) - 1);
    }
    setAvaliation(parseInt(input.value));
}

  async function submit(e:any){
    e.preventDefault();
    const response = await productGateway?.setNewAvaliation({avaliation:avaliation}, idProduct);
    setMessage(response)
    if(response.done===true){
      window.location.href = location.pathname
    }
  }
  return (
    <div className="card">
      <Message msg={message.msg} type={message.done} timers={3000} />
      <div className="card-img">
        <p>Criador: {nameUser}</p>
        {/* @ts-ignore */}
        <img src={imageProduct} alt={nameProduct} />
      </div>
      <div className="card-info">
        <p className="text-title">{nameProduct}</p>
        <span className="text-title-2">Estoque: {amount} </span>
      </div>  
      <div className="card-footer">
        <span className="text-title">{productValue} R$</span>
        <div className="card-button">
          <FaStar /> {productAvaliation}
        </div>
      </div> 
      {show === true && (
        <div className="button-collum">
          <button className="button-delete" onClick={deleteProduct}>
            <span className="button__text">Deletar</span>
          </button>
            <button className="button-edit" onClick={()=> navigate("/product/edit/"+idProduct)}>
              <span className="button__text">Editar</span>
            </button>
        </div>
      )}
    {show === false && isChat===false&& (
    <div className="button-collum-2">
        <button className="button-edit">
          <Link to={`/product/${idProduct}`}><span className="button__text" >Comprar</span></Link>
        </button>
    </div>
    )}
    {isChat ===true&&
      <div className="button-collum">
        <h6>Selecione um valor de 0 até 5 e clique no botão para enviar, mas após enviar o produto não estara mais aqui:</h6>
        <form onSubmit={submit}>
            <button className="selects" type="button"  onClick={increase}>+</button>
            <input type="number" id="number-input" min="0" max="5" readOnly />
            <button className="selects" type="button" onClick={decrease}>-</button>
            <button className="submit-avaliation" type="submit">Avaliar</button>
        </form>
      </div>
    }

      {showConfirm ? (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <p>Tem certeza que deseja deletar este produto?</p>
            <div className="confirmation-buttons">
              <button className="button-confirm" onClick={handleConfirm}>
                Confirmar
              </button>
              <button
                className="button-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductCard;
