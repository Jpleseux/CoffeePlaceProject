import "../../../public/layouts/ProductForm.css"
import Input from "../../components/forms/Input"
import { useEffect, useState, useContext } from "react"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
import { GatewayContext } from "../../gateway/gatewayContext"
import {BsCamera} from "react-icons/bs"
import Message from "../../components/interface/Message"
function ProductForm(){
    const gatewayContext = useContext(GatewayContext);
 
    const categoryGateway = gatewayContext?.categoryGateway;
    const productGateway = gatewayContext?.productGateway;
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [saller, setSaller] = useState({nameUser:""})
    const [image, setImage] = useState("")
    const [category, setCategory] = useState([])
    const [msg, setMsg] = useState({done:null, msg:""})
    // @ts-ignore
    const [product, setProduct]= useState({nameProduct:"", nameUser:"", validateProduct:"", productValue:"", descriptionProduct:"", idCategory:"", amount:0})

    async function getCategory(){
        const response = await categoryGateway?.getAll();
        // @ts-ignore
        setCategory(response.output);
        console.log(response)
    }

    useEffect(()=>{
        getCategory();
        const response = Cookies.get("userData");
        setSaller(JSON.parse(response|| ""));
    }, [])
    async function Submit(e:any){
        setIsSubmitting(true)
        e.preventDefault();
        var idCategory = ""

        if(product.idCategory ===""){
            // @ts-ignore
            idCategory = category[0].idCategory
        }else{
            idCategory = product.idCategory
        }
        var ValueProduct = product.productValue.replace(',', '.');
        const Input = {
            nameProduct:product.nameProduct,
            nameSalesman:saller.nameUser,
            validateProduct:product.validateProduct,
            productValue:parseFloat(ValueProduct),
            descriptionProduct: product.descriptionProduct,
            amount:product.amount,
            imageProduct:image,
            idCategory:idCategory
        }
        const response = await productGateway?.save(Input);
        setMsg(response)
        if(response.done === true){
            setTimeout(()=>{
                window.location.href = "/product/create"
            }, 1000)
        }
    }

    async function handleOnChange(e:any) {
        const { name, value } = e.target;
        setProduct((prevState) => ({ ...prevState, [name]: value }));
    }

    async function handleOnImage(e:any) {
        const file = e.target.files[0]

        if(file){
            const reader = new FileReader()
            
            reader.onload = (event)=>{
                const imageProduct = event.target?.result;
                // @ts-ignore
                setImage(imageProduct)
        }
        reader.readAsDataURL(file);
    }
    }

    return(
        <div className="Product-form-create">
            <h1>Cadastro de Produtos</h1>
            <Link to={`/saller/individual/${saller.nameUser}`}>
                <button className="button-back">Voltar pagina de vendedor</button>
            </Link>
            <Message msg={msg.msg} type={msg.done} timers={3000}/>
            <form onSubmit={Submit}>
                <h4>Nome do Produto:</h4>
                <Input name="nameProduct" type="text" handleOnChange={handleOnChange} placeholder="Nome do produto"/>
                <h4>Coloque a quntidade de produtos no estoque</h4>
                <Input type="number" name="amount" placeholder="Coloque a quantidade em estoque" handleOnChange={handleOnChange}/>
                <div id="container-1">
                    <h4>Selecione a categoria do seu produto:</h4>
                    <select name="idCategory" onChange={handleOnChange}>
                        {/* @ts-ignore */}
                            {category.length >0 && category.map((categori)=><option value={categori.idCategory}>{categori.nameCategory}</option>)}
                    </select>
                    <h4>Coloque o valor do seu produto:</h4>
                    <Input type="text" name="productValue" handleOnChange={handleOnChange} placeholder="Coloque o valor do produto"/>
                    <h4>Data de vencimento do seu produto:</h4>
                    <Input type="date" name="validateProduct" handleOnChange={handleOnChange}/>
                </div>
                <textarea placeholder="Digite uma descrição do produto" name="descriptionProduct" onChange={handleOnChange}></textarea>
                <div id="card-avatar">
                            {image ==="" &&
                                <BsCamera />
                            } 
                            {image !== "" &&
                                <img src={image} alt="productImage" />
                            }
                            <label className="label-file" htmlFor="avatar"><p>Adicionar foto do Produto</p></label>
                            <Input name="avatar"  type="file" handleOnChange={handleOnImage} />
 
                </div>
                <button className="button-next" disabled={isSubmitting}>Cadastrar</button>
            </form>
        </div>
    )
}

export default ProductForm
