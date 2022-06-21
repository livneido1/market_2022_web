import { Deserializable } from "../facadeObjects/deserializable";

export class IsSystemManagerRequest implements Deserializable{

  name:string;
  constructor(name?:string){
    this.name = name;
  }

  deserialize(value: any): this {
      if (value){
        Object.assign(this, value);
      }
      return this;
  }


}
