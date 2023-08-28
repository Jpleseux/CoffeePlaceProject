import Email from "./Email";
import Item from "./Item";
import PasswordGenerate from "./PasswordGenerate";
import CpfValidate from "./cpf";
import Endereco from "./endereco";
import validCNPJ from "./cnpj";
export default class User{
     constructor(readonly name:string, readonly age:number,readonly email:Email|string, public password:string,readonly salt:string, public indentification:any, public description:string,  public field:any, public endereco:Endereco | boolean, public avatar: string){
        
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
        // if(await Endereco.formatedEnderco(endereco) === false){
        //     return {msg:"Invalid CEP", done:false}
        // }
        const passwordObj = await PasswordGenerate.create(password);

        const user = await new User(formatedName,age,await Email.isValid(email),passwordObj.hash, passwordObj.salt , indentification,description, field,await Endereco.formatedEnderco(endereco), avatar );
        if(await Item.validateItem(user) ===false) return {msg:"Dado não válido", done:false};

        return {user, done: true}
    }
    static async restore(name:string, age:number,email:string, password:string,salt:string, indentification:any, description:string, field: any,endereco:any, avatar:string){
        if (await Email.isValid (email) ===false) return {msg:"Invalid Email", done:false};
        if(await Item.validateItem(endereco) ===false) return {msg:"Dado não válido", done:false};
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
        // if(await Endereco.formatedEnderco(endereco) === false){
        //     return {msg:"Invalid CEP", done:false}
        // }
        const user = await new User(name, age, await Email.isValid(email),password, salt , indentification,description, field,await Endereco.formatedEnderco(endereco), avatar );

        
        if(await Item.validateItem(user) ===false) return {msg:"Dado não válido", done:false};

        return {user}
    }

    async validatePassword(password:string, user:User){
        return await PasswordGenerate.validate(password, user)
    }
}

  