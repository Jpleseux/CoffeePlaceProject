export default class Item{
    item:any
    constructor (item:any){
        this.item = item
    }

    async checkItem(item:any){
        if(!item || item ===null || item === undefined || item === ""){
            return false;
        }
        return true
    }

    static async validateItem(item:any){
        const typeItem = typeof item
        if(typeItem ==="string"||typeItem ==="number" || typeItem ==="boolean"){
            const itemObj = new Item(item)
            const response = await itemObj.checkItem(item);
            if(response ===false)return false;
            return true;
        }
        if(typeItem ==="object"){
            const errors = [] 
            for(var iten in item){
                const itemObj = new Item(item)
                const response = await itemObj.checkItem(item[iten]);
                if(response ===false) errors.push(item);
            }
            if(errors.length >0){
                return {itens: errors, done:false};
            }
            return true;
        }
    }
}