import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../../../public/layouts/individualProductPage.css";
import { io, Socket } from "socket.io-client";
import { GatewayContext } from "../../gateway/gatewayContext";
function IndividualProductPage() {
    const { id } = useParams<{ id: string }>(); 
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>(""); 
    // @ts-ignore
    const gatewayContext = useContext<GatewayContext | undefined>(GatewayContext); 
    const productGateway = gatewayContext?.productGateway;
    const [product, setProduct] = useState<{
        nameProduct: string;
        imageProduct: string;
        productAvaliation: string;
        nameSalesman: string;
        productValue: string;
        amount: number;
        descriptionProduct: string;
        isRecomended: boolean;
    }>({
        nameProduct: "",
        imageProduct: "",
        productAvaliation: "",
        nameSalesman: "",
        productValue: "",
        amount: 0,
        descriptionProduct: "",
        isRecomended: false,
    });

    async function getProduct() {
        const response = await productGateway?.getProduct(id);
        if (response) {
            setProduct(response.output);
        }
    }

    async function increase() {
        const input = document.getElementById("number-input") as HTMLInputElement;
        if (input.value >= "4"|| input.value >="10") {
            input.value = "4";
        } else {
            input.value = String(Number(input.value) + 1);
        }
    }

    async function decrease() {
        const input = document.getElementById("number-input") as HTMLInputElement;
        if (input.value === "1"||input.value >="10") {
            input.value = "1";
        } else {
            input.value = String(Number(input.value) - 1);
        }
    }
    

    async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    }

    // async function teste() {
    //     if (socket) {
    //         socket.emit("click", "Ola");
    //     }
    // }

    useEffect(() => {
        getProduct();
        const newSocket = io("http://localhost:4000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                console.log("Connected to Socket.IO");
            });
            // socket.on("notification", (message: string) => {
            //     setMessage(message);
            // });
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

    return (
        <div className="product-page">
            <img src={product.imageProduct} alt={product.nameProduct} />
            {product.isRecomended === true &&
                <div className="recomended">
                    <img src="../../../images/coffeePlaceMini.png" alt="CoffeePlace" />
                    <h5>Recomendado</h5>
                </div>
            }
            <h1>{product.nameProduct}</h1>

            <div className="card-button">
                <FaStar /> {product.productAvaliation}.0/5.0
            </div>        
            {message &&
                <h6>{message}</h6>
            }    
            <p>Fornecedor: <span>{product.nameSalesman}</span></p>
            <p>{}</p>
            <section className="quantity-section">
                <h2>R$ {product.productValue}</h2>
                <p>Quantidade</p>
                <button onClick={increase}>+</button>
                <input onChange={handleOnChange} type="number" id="number-input" min="1" max={product.amount + 1} readOnly />
                <button onClick={decrease}>-</button>
                <button className="submit">Comprar</button>
            </section>
        </div>
    );
}

export default IndividualProductPage;
