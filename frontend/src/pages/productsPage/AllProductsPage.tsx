import { GatewayContext } from "../../gateway/gatewayContext"
import {useContext, useState, useEffect} from "react"
import ProductCard from "../../components/cards/productCard/productCard";
import "../../../public/layouts/AllProductsPage.css"
import { Link } from "react-router-dom";
function AllProductsPage(){
    const gatewayContext = useContext(GatewayContext);
    const productGateway = gatewayContext?.productGateway
    const categoryGateway = gatewayContext?.categoryGateway
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    async function getAllProducts() {
        const response = await productGateway?.getAllProducts();
        // @ts-ignore
        setProducts(await response.output)
    }
    async function getAllCategories() {
        const response = await categoryGateway?.getAll();
        // @ts-ignore
        setCategories(await response.output)
    }
    useEffect(()=>{
        getAllCategories()
    },[categories])
    useEffect(()=>{
        getAllProducts()
    }, [products])
    return (
        <div className="individual-store" id="store-2">
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
            <div className="container-address-2">
                {/* @ts-ignore */}
            {products.length>0 && products.map((product)=><ProductCard imageProduct={product.imageProduct} nameProduct={product.nameProduct} productAvaliation={product.productAvaliation} productValue={product.productValue} descriptionProduct={product.descriptionProduct} idProduct={product.idProduct} nameUser={product.nameSalesman} amount={product.amount} key={product.idProduct}/>)}
            </div>
        </div>
    )
}

export default AllProductsPage