export default class DateEntity{
    constructor(value: Date){

    }

    static async isExpirede(value:Date){
        const dateToday = new Date;
        // @ts-ignore
        const result = dateToday - value
        console.log(result)
    }
}