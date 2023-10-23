import httpClient from "./httpClient";
export default class fetchAdapter implements httpClient{
    async post(url: string, data: any): Promise<any> {
        const response = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });
        return await response.json()
    }
    async get(url: string, id?: string | undefined): Promise<any> {
        if(id){
            const response = await fetch(`${url}/${id}`);
            return await response.json()
        }
        else{
            const response =  await fetch(url);
            return await response.json()
        }
    }
    async delete(url: string, id: string): Promise<any> {
        const response = await fetch(`${url}/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });
        return await response.json()
    }
    async patch(url: string, data: any, id: string): Promise<any> {
        const response = await fetch(`${url}/${id}`, {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });
        return await response.json()
    }
} 