import "../../../public/layouts/ProductForm.css"
import Input from "../../components/forms/Input"

function ProductForm(){

    async function Submit(e:any){

    }

    async function handleOnChange(e:any) {
        
    }

    return(
        <div className="Product-form-create">
            <h1>Cadastro de Produtos</h1>
            <form onSubmit={Submit}>
                <Input name="nameProduct" type="text" handleOnChange={handleOnChange} placeholder="Nome do produto"/>
            </form>
        </div>
    )
}

export default ProductForm
