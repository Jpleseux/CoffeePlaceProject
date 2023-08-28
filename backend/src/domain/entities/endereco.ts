export default class Endereco{
    constructor(public city: string,public state:string, public street:string, public neighborhood:string, readonly cep:string){

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
      const enderecoObj = new Endereco(endereco.city, endereco.state, endereco.street, endereco.neighborhood, endereco.cep);

      // const isValidCep = await enderecoObj.consultarCEP(endereco.cep);

      // if(isValidCep ===false){
      //   return false;
      // }
      return enderecoObj;
    }
}
