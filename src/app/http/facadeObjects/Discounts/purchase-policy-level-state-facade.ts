import { Deserializable } from "../deserializable";

export class PurchasePolicyLevelStateFacade implements Deserializable {
  type:string;
  constructor(type?:string){
    this.type = type ? type : "";
  }

  deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this, value);
      return this;
  }
}
