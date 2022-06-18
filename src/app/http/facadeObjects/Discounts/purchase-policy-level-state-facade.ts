import { Deserializable } from "../deserializable";
import { PurchasePolicyLevelStateWrapper } from "./Wrappers/purchase-policy-level-state-wrapper";

export abstract class PurchasePolicyLevelStateFacade implements Deserializable {
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

  abstract getWrapper():PurchasePolicyLevelStateWrapper;

}
