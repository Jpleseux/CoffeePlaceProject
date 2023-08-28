import productRepository from "../../application/repository/productRepository";
import Product from "../../domain/entities/Product";
const productModel = require("../database/models/ProductModel")
export default class productRepositoryDatabase implements productRepository{
    async save(product: Product): Promise<void> {
        await productModel.create(product);  
    };
    async getByName(name: String): Promise<Product | { msg: String; }> {
       const response = await productModel.findOne({nameProduct: name});

       return response
    }
    async getById(idProduct: String): Promise<Product | { msg: String; }> {
        const response = await productModel.findById(idProduct);

       return response
    }
    async getAll(): Promise<Product[]> {
        const products = []
        const response = await productModel.find();
        for (let product of response){
            products.push(new Product(product.nameProduct, product.validateProduct, product.productValue, product.idCategory, product.idSalesman, product.idBuyer, product.isRecomended, product.productAvaliation, product.descriptionProduct))
        }
        return products;
    }
    async patch(product: Product, idProduct: String): Promise<void> {
        const response = await productModel.findByIdAndUpdate(idProduct, product);

        return await response
    }
    async delete(idProduct: String): Promise<void> {
        await productModel.findByIdAndDelete(idProduct);
    }
}