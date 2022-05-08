import { Deserializer } from "v8";
import { Deserializeable } from "./deserializable";

export class ItemFacade implements Deserializeable{

    private items : Map<ItemFacade, number>
    private price : number
    constructor(){
    }

    deserialize(value: any): this {
        Object.assign(value);
        for (let entry of value.items.entries()) {
            this.items.set(entry[0], entry[1]);    //"Lokesh" 37 "Raj" 35 "John" 40
        }
        return this;
    }
}