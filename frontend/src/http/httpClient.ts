export default interface httpClient{
    get(url:string, id?:string):Promise<any>;
    post(url:string, data:any):Promise<any>
}