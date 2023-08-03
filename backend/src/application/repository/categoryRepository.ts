import category from "../../domain/entities/category";

export default interface categoryRepository{
    save(category:category ):Promise<void>;
    patch(category:category, idCategory:String):Promise<void>;
    delete(idCategory:String):Promise<void>;
    getOne(idCategory:String):Promise<category | {msg:String}>;
    getAll():Promise<category[]>;
}