import { Deserializer } from "v8";
import { Deserializable } from "./deserializable";

export class PermissionFacade implements Deserializable{
    private name : string

    constructor(){
        this.name=""
    }

    deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this,value);
      return this
    }
}
