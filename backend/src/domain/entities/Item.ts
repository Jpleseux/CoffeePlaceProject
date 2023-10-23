export default class Item{
    item:any
    constructor (item:any){
        this.item = item
    }

    async checkItem(item:any){
        if(!item || item ===null || item === undefined){
            return false;
        }
        return true
    }

    static async validateItem(item: any) { 
        const errors:any = [];
        const typeItem = typeof item;
        const numsItem = Object.keys(item).length === 0
        if (typeItem === "string" || typeItem === "number" || typeItem === "boolean") {
            const itemObj = new Item(item);
            const response = await itemObj.checkItem(item);
            if (response === false) return { itens: errors, done: false };
            return  { itens: errors, done: true };
        }
        if (typeItem === "object") {
            if(numsItem === true){
               return { itens: errors, done: false }            
            }
            for (let iten in item) {
                const itemObj = new Item(item[iten]); 
                const response = await itemObj.checkItem(item[iten]);
                if (response === false) errors.push(item[iten]);
            }
        }
        if (errors.length > 0) {
            return { itens: errors, done: false };
        }

        return { itens: errors, done: true };
    }
    
}