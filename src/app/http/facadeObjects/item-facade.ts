import { Deserializer } from "v8";
import { Deserializeable } from "./deserializable";

export enum Category{
    general,
    fruit,
    meat,
    cellular,
    electricity
}
export class ItemFacade implements Deserializeable{
    private info: string ;
    private ID: number ;
    private name: string ;
    private price:number ;
    private category:Category;
    private keywords: string[];
    private rank : number;
    private rankers : number;

    constructor(){
        this.info = "";
        this.ID = 0;
        this.name = "";
        this.price = 0;
        this.category = Category.general;
        this.keywords=[];
        this.rank=0;
        this.rankers=0;
    }

    deserialize(value: any): this {
        Object.assign(value);
        this.category = value.category;
        this.keywords = [];
        for (const keyword of value.keywords){
            this.keywords.push(keyword);
        }
        return this;
    }

}
