export default interface emailGateway{
    changePassword(emailReciver:string):Promise<any>;
    sendComplaint(emailSender: string, body:any):Promise<any>;
}