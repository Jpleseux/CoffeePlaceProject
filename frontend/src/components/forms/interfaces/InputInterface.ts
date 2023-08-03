export default interface InputInterface{
    type:string; 
    text?:string;
    name:string;
    placeholder?:string;
    handleOnChange:(e:any) =>void;
    value?:string
}