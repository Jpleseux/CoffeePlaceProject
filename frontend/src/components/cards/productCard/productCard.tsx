import  { useState, useEffect, useContext } from "react";
import { FaStar } from "react-icons/fa";
import productCardInterface from "../../../../public/layouts/interfaces/ProductCardInterface";
import "./productCard.css";
import Cookies from "js-cookie";
import { GatewayContext } from "../../../gateway/gatewayContext";
import Message from "../../interface/Message";

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

  useEffect(() => {
    if(!Cookies.get("userData")){
      setUser("Anônimo")
    }else{
      // @ts-ignore
      setUser(JSON.parse(Cookies.get("userData")));
    }

  }, []);

  useEffect(() => {
        // @ts-ignore
    if (!user || user.nameUser !== nameUser) {
      setShow(false);
    }
    // @ts-ignore
    if (user.nameUser === nameUser) {
      setShow(true);
    }
  }, [user]);

  async function deleteProduct() {
    setShowConfirm(true);
  }

  async function handleConfirm() {
    setMessage(await productGateway?.delete(idProduct));
    setShowConfirm(false);
    setTimeout(() => {
        window.location.href = `/saller/individual/${nameUser}`;
    }, 1000);
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
          <button className="button-edit">
            <span className="button__text">Editar</span>
          </button>
        </div>
      )}
    {show === false && (
    <div className="button-collum-2">
        <button className="button-edit">
        <span className="button__text">Comprar</span>
        </button>
    </div>
    )}

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
