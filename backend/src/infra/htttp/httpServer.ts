export default interface httpServer{
    on(method:string, url:String, callBack: Function,middleware?:any):void;
    listen?(port:Number):any;
};