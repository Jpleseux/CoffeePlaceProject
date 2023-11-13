import productRepository from "../../application/repository/productRepository";
import Product from "../../domain/entities/Product";
const productModel = require("../database/models/ProductModel")
const orderModel = require("../database/models/orderModel")
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
            products.push(new Product(product._id,product.nameProduct, product.validateProduct, product.productValue, product.idCategory, product.nameSalesman,product.imageProduct,product.amount, product.idBuyer, product.isRecomended, product.productAvaliation, product.descriptionProduct))
        }
        return products;
    }
    async patch(product: Product, idProduct: String): Promise<{msg:string, done:Boolean}> {
        const response = await productModel.findByIdAndUpdate(idProduct, product);
        if(!response){
            return await {msg:"Erro ao editar Produto", done:false}
        }
        else{
            return await {msg:"Editado com sucesso", done:true}
        }
    } 
    async delete(idProduct: String): Promise<void> {
        await productModel.findByIdAndDelete(idProduct);
    }
    async getProductsByUser(name: string): Promise<Product[]> {
        const products = []
        const response = await productModel.find({nameSalesman:name});
        for (let product of response){
            products.push(new Product(product._id,product.nameProduct, product.validateProduct, product.productValue, product.idCategory, product.nameSalesman,product.imageProduct,product.amount, product.idBuyer, product.isRecomended, product.productAvaliation, product.descriptionProduct))
        }
        return products; 
    }
    async getNewProducts(): Promise<Product[]> {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const products = [] 
        const response = await productModel.find({ createdAt: { $gte: hoje } });
        for (let product of response){ 
            products.push(new Product(product._id,product.nameProduct, product.validateProduct, product.productValue, product.idCategory, product.nameSalesman,product.imageProduct,product.amount, product.idBuyer, product.isRecomended, product.productAvaliation, product.descriptionProduct))
        }
        return products; 
    }
    async getTopProducts(): Promise<Product[]> {
        const products = [] 
        const response = await productModel.find({ productAvaliation: { $gt: 4 } });
        for (let product of response){ 
            products.push(new Product(product._id,product.nameProduct, product.validateProduct, product.productValue, product.idCategory, product.nameSalesman,product.imageProduct,product.amount, product.idBuyer, product.isRecomended, product.productAvaliation, product.descriptionProduct))
        }
        return products; 
    }
    async getRecomendProducts():Promise<Product[]>{
        const products = [] 
        const response = await productModel.find({isRecomended:true});
        for (let product of response){ 
            products.push(new Product(product._id,product.nameProduct, product.validateProduct, product.productValue, product.idCategory, product.nameSalesman,product.imageProduct,product.amount, product.idBuyer, product.isRecomended, product.productAvaliation, product.descriptionProduct))
        }
        return products;
    }
    async getProductByCategory(idCategory:string):Promise<Product[]>{
        const products = [] 
        console.log(idCategory)
        const response = await productModel.find({idCategory:idCategory});
        for (let product of response){ 
            products.push(new Product(product._id,product.nameProduct, product.validateProduct, product.productValue, product.idCategory, product.nameSalesman,product.imageProduct,product.amount, product.idBuyer, product.isRecomended, product.productAvaliation, product.descriptionProduct))
        }
        return products;
    }
    async setNewAmountFromProduct(idProduct: string, newAmount: number): Promise<Boolean> {
        const response = await productModel.updateOne(
            { _id: { $in: idProduct } },
            {
                $set: {
                    amount: newAmount,
                },
              },
        )
    if(!response){
        return false;
    }
    return true
    }
    async setNewAvaliation(newAvaliation: number, idProduct: string): Promise<boolean> {
        const product = await productModel.findById(idProduct);
        const actualTotalAvaliation = product.productAvaliation * product.avaliationAmount;
        const newTotalAvaliation = actualTotalAvaliation + newAvaliation;
        const newAvaliationAmount = product.avaliationAmount + 1;
        const newAverageAvaliation = (newTotalAvaliation / newAvaliationAmount).toFixed(1);
        const order = await orderModel.findOne({"product._id": idProduct});
        const idOrder = order.id;
        console.log(idOrder)
        await orderModel.updateOne(
            { _id: idOrder },
            {
              $set: {
                isRated:true
              }
            }
          );
        const response = await productModel.updateOne(
          { _id: idProduct },
          {
            $set: {
              productAvaliation: newAverageAvaliation,
              avaliationAmount: newAvaliationAmount,
            }
          }
        );
      
        return response; 
    }
}