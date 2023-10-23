import "../../../public/layouts/ProductForm.css"
import Input from "../../components/forms/Input"
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
import { GatewayContext } from "../../gateway/gatewayContext"
import {BsCamera} from "react-icons/bs"
import Message from "../../components/interface/Message"
import { useNavigate } from "react-router-dom"
function EditForm(){
    const navigate = useNavigate()
    const {id} = useParams()
    const gatewayContext = useContext(GatewayContext);
    const categoryGateway = gatewayContext?.categoryGateway;
    const productGateway = gatewayContext?.productGateway;
    const [saller, setSaller] = useState({nameUser:""});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [image, setImage] = useState("")
    const [category, setCategory] = useState([])
    const [msg, setMsg] = useState({done:null, msg:""})
    // @ts-ignore
    const [product, setProduct]= useState({nameProduct:"", nameUser:"", validateProduct:new Date(), productValue:"", descriptionProduct:"", idCategory:"", amount:0, imageProduct: ""})
    
    function formatDate(dateRecive:Date) {
        const date = new Date(dateRecive);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    async function getCategory(){
        const response = await categoryGateway?.getAll();
        // @ts-ignore
        setCategory(response.output);
    }
    async function getProduct() {
        const response = await productGateway?.getProduct(id);
        // @ts-ignore
        setProduct(response.output)
        // @ts-ignore
        setImage(response.output.imageProduct)
    }

    useEffect(()=>{
        getCategory();
        getProduct();
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
        const response = await productGateway?.patch(Input, id);
        console.log(response)
        setMsg(response)
        if(response.done === true){
            window.location.href = "/product/edit/"+id
        }
    }

    async function handleOnChange(e:any) {
        const { name, value } = e.target;
        if (name === "validateProduct") {
            setProduct((prevState) => ({
              ...prevState,
              [name]: new Date(value),
            }));
          } else {
            setProduct((prevState) => ({ ...prevState, [name]: value }));
          }
        
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
                <Input name="nameProduct" type="text" handleOnChange={handleOnChange} placeholder="Nome do produto" value={product.nameProduct}/>
                <h4>Coloque a quntidade de produtos no estoque</h4>
                <Input type="number" name="amount" placeholder="Coloque a quantidade em estoque" handleOnChange={handleOnChange} value={product.amount}/>
                <div id="container-1">
                    <h4>Selecione a categoria do seu produto:</h4>
                    <select name="idCategory" onChange={handleOnChange}>
                        {/* @ts-ignore */}
                            {category.length >0 && category.map((categori)=><option value={categori.idCategory}>{categori.nameCategory}</option>)}
                    </select>
                    <h4>Coloque o valor do seu produto:</h4>
                    <Input type="text" name="productValue" handleOnChange={handleOnChange} placeholder="Coloque o valor do produto" value={product.productValue}/>
                    <h4>Data de vencimento do seu produto:</h4>
                    <Input type="date" name="validateProduct" handleOnChange={handleOnChange} value={formatDate(product.validateProduct)}/>
                </div>
                <textarea placeholder="Digite uma descrição do produto" name="descriptionProduct" onChange={handleOnChange} value={product.descriptionProduct}></textarea>
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
                <button className="button-next" disabled={isSubmitting}>
                        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </div>
    )
}

export default EditForm
