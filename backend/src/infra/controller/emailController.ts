import Item from "../../domain/entities/Item";
import useCaseFactory from "../factory/useCaseFactory";
import httpServer from "../htttp/httpServer";
const routerPrefix = "/email";
export default class emailController{
    constructor(emailController: httpServer, useCases:useCaseFactory){
        emailController.on("get", routerPrefix+"/sendemail/password/change/:email", async function (params:any) {
            try {
                const email = params.email;
                const changePassword = await useCases.changePassword();
                const output = await changePassword.execute(email);
                const Transporter = await useCases.defineEmailAdmin();
                const encodedEmail = email.replace(/@gmail\.com/, '');
                // @ts-ignore
                const token = output.token
                const url = encodeURI(`http://localhost:5173/change/password/${encodedEmail}`)
                const mailOptions = {
                    from: email,
                    to: "joaopleseux@gmail.com",
                    subject: 'Redefinição de Senha',
                    html: `<p>Clique no botão para redefinir sua senha</p>
                        <a href="${url}"><button>Mudar senha</button></a>
                        <br>
                        <p>O código para troca de senha é:  <span>${token}<span/>.</p>
                    `,
                  };
                //   @ts-ignore
                const response = await Transporter.sendMail(mailOptions);
                return {data:{msg:"Email enviado com sucesso, verifique sua caixa de entrada para redefinir sua senha",response, done:true}, typeHttpResponse: 200}

            } catch (error) {
                return {data:{msg:"Erro enquanto enviava o email"+error, done:false}, typeHttpResponse: 400}
            }
        })
        emailController.on("post", routerPrefix+"/sendemail/complaints/:email", async function (params:any, body:any) {
            try {
                console.log(body)
                const email = params.email;
                const ItemResponse= await Item.validateItem(body)
                if(ItemResponse.done == false|| ItemResponse.itens.length >=1){
                    return {data:{msg:"Titulo ou mensagem devem ter algum valor e não estar vazios", done:false}, typeHttpResponse: 400}
                }
                const Transporter = await useCases.defineEmailAdmin()
                // @ts-ignore
                const mailOptions = {
                    from: email,
                    to: 'joaopleseux@gmail.com',
                    subject: body.title,
                    html: body.msg,
                  };
                //   @ts-ignore
                const response = await Transporter.sendMail(mailOptions);
                return {data:{msg:"Email enviado com sucesso",response, done:true}, typeHttpResponse: 200}

            } catch (error) {
                return {data:{msg:"Erro enquanto enviava o email"+error, done:false}, typeHttpResponse: 400}
            }
        })
    }
}