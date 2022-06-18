import { Deserializable } from "../deserializable";
import { ObjectsDeserializer } from "../objects-deserializer";
import { PurchasePolicyLevelStateFacade } from "./purchase-policy-level-state-facade";
import { PurchasePolicyTypeFacade } from "./purchase-policy-type-facade";
import { PurchasePolicyTypeWrapper, PurchasePolicyTypeWrapperType } from "./Wrappers/purchase-policy-type-wrapper";

export class AtMostPurchasePolicyTypeFacade extends PurchasePolicyTypeFacade implements Deserializable{
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

  getWrapper(): PurchasePolicyTypeWrapper {
    return new PurchasePolicyTypeWrapper(
      PurchasePolicyTypeWrapperType.AtMostPurchasePolicyTypeFacade,
      this.amount,
      this.purchasePolicyLevelStateFacade.getWrapper(),
      []
    );
  }
}
