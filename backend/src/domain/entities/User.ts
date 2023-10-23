import Email from "./Email";
import Item from "./Item";
import PasswordGenerate from "./PasswordGenerate";
import CpfValidate from "./cpf";
import Endereco from "./endereco";
import validCNPJ from "./cnpj";
export default class User{
     constructor(readonly name:string, readonly age:number,readonly email:Email|string, public password:string,readonly salt:string, public indentification:any, public description:string,  public field:any, public endereco:Endereco | boolean, public avatar: string, readonly isPremium?:boolean){
        
    }

    static async create(name:string, age:number, email:string, password:string, indentification:any, description:string, field: any,endereco:any, avatar:string){
        if(await Email.isValid(email) ===false) return {msg:"Invalid Email", done:false};
        for(var obj in indentification){
            if(obj ==="cpf") {
                if(await CpfValidate.validateCpf(indentification[obj])===false){
                    return {msg:"Invalid Cpf", done:false};
                }
            }
            if(obj ==="cnpj"){
                if(await validCNPJ(indentification[obj])===false){
                    return {msg:"Invalid Cnpj", done:false}
                }
            }
        }    
        const formatedName = name.trim().replace(/\s+/g, ' ');
        const passwordObj = await PasswordGenerate.create(password);

        const user = await new User(formatedName,age,await Email.isValid(email),passwordObj.hash, passwordObj.salt , indentification,description, field,await Endereco.formatedEnderco(endereco), avatar );
        return {user, done: true}
    }
    static async restore(name:string, age:number,email:string, password:string,salt:string, indentification:any, description:string, field: any,endereco:any, avatar:string, ispremium:boolean){
        if (await Email.isValid (email) ===false) return {msg:"Invalid Email", done:false};
        if((await Item.validateItem(endereco)).done !==true) return {msg:"Dado não válido", done:false};
        for(var obj in indentification){
            if(obj ==="cpf") {
                if(await CpfValidate.validateCpf(indentification[obj])===false){
                    return {msg:"Invalid Cpf", done:false};
                }
            }
            if(obj ==="cnpj"){
                if(await validCNPJ(indentification[obj])===false){
                    return {msg:"Invalid Cnpj", done:false}
                }
            }
        }  
        const user = await new User(name, age, await Email.isValid(email),password, salt , indentification,description, field,await Endereco.formatedEnderco(endereco), avatar, ispremium );
        return {user}
    }

    async validatePassword(password:string, user:User){
        return await PasswordGenerate.validate(password, user)
    }
}

  