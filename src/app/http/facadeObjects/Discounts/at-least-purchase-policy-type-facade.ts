import { Deserializable } from "../deserializable";
import { ObjectsDeserializer } from "../objects-deserializer";
import { PurchasePolicyLevelStateFacade } from "./purchase-policy-level-state-facade";
import { PurchasePolicyTypeFacade } from "./purchase-policy-type-facade";

export class AtLeastPurchasePolicyTypeFacade extends PurchasePolicyTypeFacade implements Deserializable {
  amount: number;
  constructor(amount?:number,  purchasePolicyLevelStateFacade?:PurchasePolicyLevelStateFacade){
    super("AtLeastPurchasePolicyTypeFacade", purchasePolicyLevelStateFacade);
    this.amount = amount? amount : -1;

  }

  deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this,value);
      this.purchasePolicyLevelStateFacade = new ObjectsDeserializer().getPurchasePolicyLevelStateFacade(value.purchasePolicyLevelStateFacade);
      return this;
  }
}
