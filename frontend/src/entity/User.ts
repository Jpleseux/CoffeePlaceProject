export default class User{
    constructor(readonly email:string|string, public password:string,readonly salt:string, public cpf:string, public description:string,  public custonField:any, public endereco: {} | boolean){
       
   }
}