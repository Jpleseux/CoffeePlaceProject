import categoryRepository from "../../application/repository/categoryRepository";
import category from "../../domain/entities/category";
const categoryModel = require("../database/models/categoryModel");
 
export default class categoryRepositoryDatabase implements categoryRepository{
    async save(category: category): Promise<void> {
        await categoryModel.create(category);
    };
    async getOne(idCategory: String): Promise<category | {msg:String}> {
        const response = await categoryModel.findById(idCategory);
        if(!response){
            return {msg:"Usuario não encontrado no banco de dados"}
        }
        return new category(response.descriptionCategory, response.nameCategory, response._id);
    }; 
    async delete(idCategory: String): Promise<void> {
        await categoryModel.findByIdAndDelete(idCategory);
    };
    async getAll(): Promise<category[]> {
        const categories = []
        const response = await categoryModel.find();
        for (let categorie of response){
            categories.push(new category(categorie.descriptionCategory, categorie.nameCategory, categorie._id))
        }
        return categories;
    };
    async patch(category: category, idCategory: String): Promise<void> {
        const response = await categoryModel.findByIdAndUpdate(idCategory, category);

        return response
    };
}