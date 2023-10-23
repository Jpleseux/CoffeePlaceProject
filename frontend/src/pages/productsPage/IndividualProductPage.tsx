import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../../../public/layouts/individualProductPage.css";
import { io, Socket } from "socket.io-client";
import { GatewayContext } from "../../gateway/gatewayContext";
<<<<<<< HEAD
import Cookies from "js-cookie";
import Message from "../../components/interface/Message";
import generateRandomCode from "../../entity/generateCod";
function IndividualProductPage() {
    const { id } = useParams<{ id: string }>(); 
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<{msg:any, done:Boolean}>({msg:"", done:true}); 
    const [buyer, setBuyer] = useState({})
    // @ts-ignore
    const gatewayContext = useContext<GatewayContext | undefined>(GatewayContext); 
    const productGateway = gatewayContext?.productGateway;
    const orderGateway = gatewayContext?.orderGateway;
    const OrderCode = generateRandomCode();
    const [amount, setAmount]= useState(0);
    const [show, setShow] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [product, setProduct] = useState<{
        _id:string,
=======
function IndividualProductPage() {
    const { id } = useParams<{ id: string }>(); 
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>(""); 
    // @ts-ignore
    const gatewayContext = useContext<GatewayContext | undefined>(GatewayContext); 
    const productGateway = gatewayContext?.productGateway;
    const [product, setProduct] = useState<{
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
        nameProduct: string;
        imageProduct: string;
        productAvaliation: string;
        nameSalesman: string;
        productValue: string;
        amount: number;
        descriptionProduct: string;
        isRecomended: boolean;
    }>({
<<<<<<< HEAD
        _id:"",
        nameProduct: "",
        imageProduct: "",
        productAvaliation: "", 
=======
        nameProduct: "",
        imageProduct: "",
        productAvaliation: "",
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
        nameSalesman: "",
        productValue: "",
        amount: 0,
        descriptionProduct: "",
        isRecomended: false,
    });

    async function getProduct() {
<<<<<<< HEAD
        const userResponse = await Cookies.get("userData");
        //   @ts-ignore
        const userDataObj = JSON.parse(userResponse);
        setBuyer(userDataObj)
=======
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
        const response = await productGateway?.getProduct(id);
        if (response) {
            setProduct(response.output);
        }
    }

    async function increase() {
        const input = document.getElementById("number-input") as HTMLInputElement;
<<<<<<< HEAD
        if (parseInt(input.value) >= product.amount|| parseInt(input.value) >= product.amount) {
            input.value = product.amount.toString();
        } else {
            input.value = String(Number(input.value) + 1);
        }
        setAmount(parseInt(input.value));

=======
        if (input.value >= "4"|| input.value >="10") {
            input.value = "4";
        } else {
            input.value = String(Number(input.value) + 1);
        }
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
    }

    async function decrease() {
        const input = document.getElementById("number-input") as HTMLInputElement;
<<<<<<< HEAD
        input.value = String(Number(input.value) - 1);
        setAmount(parseInt(input.value));
    }

    async function purchase(e:any) {
        if(amount <=0){
            setMessage({msg:"O quantidade de produtos tem que ser maior que 0", done:false});
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 5000);
        }
        if(amount >0){
            setIsSubmitting(true)
            e.preventDefault();
            const Input = {
                product:product,
                amount:amount,
                finalOrderCode:(await OrderCode).toString(),
                saller:product.nameSalesman,
                // @ts-ignore
                buyer:{nameBuyer: buyer.nameUser, addressBuyer:buyer.address}
            }
            const response = await orderGateway.save(Input);
            setMessage(response);
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 5000);
            console.log(response.response.response)
            if(response.done === true){
                const output = await socket?.emit("Purchase", response.response.response);
                console.log(output)
            }
            setTimeout(()=>{
                // window.location.href = "/product/"+id
            }, 3000)
        }
    }
=======
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

>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
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
<<<<<<< HEAD
        } 
=======
            // socket.on("notification", (message: string) => {
            //     setMessage(message);
            // });
        }
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

<<<<<<< HEAD
    return ( 
        <div>
            {show ===true &&
                <Message msg={message.msg} timers={5000} type={message.done}/>
            }   
            {show ===false &&
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
                <p>Fornecedor: <span>{product.nameSalesman}</span></p>
                <p>Quantidade do produto em estoque: <span>{product.amount}</span></p>
                <section className="quantity-section">
                    <h2>R$ {product.productValue}</h2>
                    <p>Quantidade</p>
                    <button onClick={increase}>+</button>
                    <input type="number" id="number-input" min="1" max={product.amount + 1} readOnly />
                    <button onClick={decrease}>-</button>
                    <button onClick={purchase} className="submit" disabled={isSubmitting}>Comprar</button>
                </section>
            </div>
            }
=======
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
>>>>>>> 2ea81feb666dfe58849fe40dd1e860f38d9717d5
        </div>
    );
}

export default IndividualProductPage;
