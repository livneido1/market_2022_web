import { Deserializable } from "../deserializable";
import { ObjectsDeserializer } from "../objects-deserializer";
import { PurchasePolicyLevelStateFacade } from "./purchase-policy-level-state-facade";
import { PurchasePolicyTypeFacade } from "./purchase-policy-type-facade";
import { PurchasePolicyTypeWrapper, PurchasePolicyTypeWrapperType } from "./Wrappers/purchase-policy-type-wrapper";

export class AtLeastPurchasePolicyTypeFacade extends PurchasePolicyTypeFacade implements Deserializable {
  amount: number;
  constructor(amount?:number,  purchasePolicyLevelStateFacade?:PurchasePolicyLevelStateFacade){
    super("AtLeastPurchasePolicyTypeFacade","AtLeast Policy", purchasePolicyLevelStateFacade);
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

  getWrapper(): PurchasePolicyTypeWrapper {
    return new PurchasePolicyTypeWrapper(
      PurchasePolicyTypeWrapperType.AtLeastPurchasePolicyTypeFacade,
      this.amount,
      this.purchasePolicyLevelStateFacade.getWrapper(),
      []
    );
  }

  getString(): string {
      return "Info: Atleast " + this.amount + " items needed\nLevel: "+this.purchasePolicyLevelStateFacade.getString();
  }
}
