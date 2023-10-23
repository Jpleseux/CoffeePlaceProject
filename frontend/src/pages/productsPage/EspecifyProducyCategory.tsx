import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import { GatewayContext } from "../../gateway/gatewayContext";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/productCard/productCard";
import "../../../public/layouts/especifyProductCategory.css"
function EspecifyProductCategory(){
    const gatewayContext = useContext(GatewayContext);
    const productGateway = gatewayContext?.productGateway
    const categoryGateway = gatewayContext?.categoryGateway
    const {id} = useParams();
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryEspecify, setCategoryEspecify] = useState({nameCategory:""})

    async  function getProducts(){
        const response = await productGateway?.geProductBycategory(id);
        // @ts-ignore
        setProducts(response.output);
    }
    async function getAllCategories() {
        const response = await categoryGateway?.getAll();
        // @ts-ignore
        setCategories(await response.output)
    }

    useEffect(()=>{
        getAllCategories();
        // @ts-ignore
        setCategoryEspecify(categories.find((category)=>category.idCategory === id))
        console.log(categoryEspecify)
    },[id, categories])
    useEffect(()=>{
        getProducts()
    }, [products])

    return(
        <div>
            <div className="individual-store" id="store-2">
            {categoryEspecify &&             
                <h1>Categoria de produtos: {categoryEspecify.nameCategory}</h1>
            }
            <div className="sidebar-2" style={{ backgroundColor: '#EDE2D3' }}>
                <h2>Filtre produtos por Categoria</h2>
                <ul>
                    {categories.length !== 0 && categories.map((category) => (
                        //@ts-ignore
                    <li key={category.idCategory}>
                        {/* @ts-ignore */}
                        <Link to={`/product/especify/${category.idCategory}`}>{category.nameCategory}</Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="container-address-2" id="container-especify">
                {/* @ts-ignore */}
            {products.length>0 && products.map((product)=><ProductCard imageProduct={product.imageProduct} nameProduct={product.nameProduct} productAvaliation={product.productAvaliation} productValue={product.productValue} descriptionProduct={product.descriptionProduct} idProduct={product.idProduct} nameUser={product.nameSalesman} amount={product.amount} key={product.idProduct}/>)}
            {products.length <1&&<h2>Nenhum produto encontrado com essa categoria</h2>
            }
            </div>
        </div>
        </div>
    )
}

export default EspecifyProductCategory