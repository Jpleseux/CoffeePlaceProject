import Category from "../entity/Category"

export default interface categoryGateway {
    save(category:Category):Promise<any>;
}

type output ={

}