import { Deserializer } from "v8";
import { Deserializeable } from "./deserializable";

export class PermissionFacade implements Deserializeable{
    private name : string

    constructor(){
        this.name=""
    }

    deserialize(value: any): this {
        Object.assign(value)
        return this
    }   
}