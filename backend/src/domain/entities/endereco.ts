export default class Endereco{
    constructor(public cidade: string,public estado:string, public rua:string, public bairro:string, readonly cep:string){

    }
    async consultarCEP(cep: string){
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      try {
        const response = await fetch(url, {
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
        });
        if(response.status===400) return false
        return true;
      } catch (error) {
        return false;
      }
      }

    static async formatedEnderco(endereco:any){
      const enderecoObj = new Endereco(endereco.cidade, endereco.estado, endereco.rua, endereco.bairro, endereco.cep);

      const isValidCpf = await enderecoObj.consultarCEP(endereco.cep);

      if(isValidCpf ===false){
        return false;
      }
      return enderecoObj;
    }
}
