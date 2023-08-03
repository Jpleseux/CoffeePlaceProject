import Email from "./Email";
import Item from "./Item";
import PasswordGenerate from "./PasswordGenerate";
import CpfValidate from "./cpf";
import Endereco from "./endereco";
<<<<<<< HEAD
import validCNPJ from "./cnpj";
export default class User{
     constructor(readonly name:string, readonly age:number,readonly email:Email|string, public password:string,readonly salt:string, public indentification:any, public description:string,  public custonField:any, public endereco:Endereco | boolean,){
        
    }

    static async create(name:string, age:number, email:string, password:string, indentification:any, description:string, custonField: any,endereco:any){
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
=======

export default class User{
     constructor(readonly email:Email|string, public password:string,readonly salt:string, public cpf:string, public description:string,  public custonField:any, public endereco:Endereco | boolean){
        
    }

    static async create(email:string, password:string, cpf:string, description:string, custonField: any,endereco:any){
        if(await Email.isValid(email) ===false) return {msg:"Invalid Email", done:false};
        
        if(await CpfValidate.validateCpf(cpf) ===false) return {msg:"Invalid Cpf", done:false};
>>>>>>> origin/main
        if(await Endereco.formatedEnderco(endereco) === false){
            return {msg:"Invalid CEP", done:false}
        }
        const passwordObj = await PasswordGenerate.create(password);

<<<<<<< HEAD
        const user = await new User(name,age,await Email.isValid(email),passwordObj.hash, passwordObj.salt , indentification,description, custonField,await Endereco.formatedEnderco(endereco) );
=======
        const user = await new User(await Email.isValid(email),passwordObj.hash, passwordObj.salt , cpf,description, custonField,await Endereco.formatedEnderco(endereco) );
>>>>>>> origin/main
        if(await Item.validateItem(user) ===false) return {msg:"Dado não válido", done:false};

        return {user, done: true}
    }
<<<<<<< HEAD
    static async restore(name:string, age:number,email:string, password:string,salt:string, indentification:any, description:string, custonField: any,endereco:any){
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
        if(await Endereco.formatedEnderco(endereco) === false){
            return {msg:"Invalid CEP", done:false}
        }
        const user = await new User(name, age, await Email.isValid(email),password, salt , indentification,description, custonField,await Endereco.formatedEnderco(endereco) );
=======
    static async restore(email:string, password:string,salt:string, cpf:string, description:string, custonField: any,endereco:any){
        if(await Email.isValid(email) ===false) return {msg:"Invalid Email", done:false};
        if(await CpfValidate.validateCpf(cpf) ===false) return {msg:"Invalid Cpf", done:false};
        if(await Endereco.formatedEnderco(endereco) === false){
            return {msg:"Invalid CEP", done:false}
        }
        const user = await new User(await Email.isValid(email),password, salt , cpf,description, custonField,await Endereco.formatedEnderco(endereco) );
>>>>>>> origin/main
        
        if(await Item.validateItem(user) ===false) return {msg:"Dado não válido", done:false};

        return {user, done: true}
    }

    async validatePassword(password:string, user:User){
        return await PasswordGenerate.validate(password, user)
    }
}