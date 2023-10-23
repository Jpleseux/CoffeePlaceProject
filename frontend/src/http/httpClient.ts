export default interface httpClient{
    get(url:string, id?:string):Promise<any>;
    post(url:string, data:any):Promise<any>
    delete(url:string, id:string):Promise<any>;
    patch(url:string, data:any, id:string|undefined):Promise<any>;
}