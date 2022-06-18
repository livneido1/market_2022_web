import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';
import { PurchasePolicyTypeFacade } from './purchase-policy-type-facade';

export abstract class CompositePurchasePolicyTypeFacade
  extends PurchasePolicyTypeFacade
  implements Deserializable
{
  purchasePolicyTypeFacades: PurchasePolicyTypeFacade[];
  constructor(type?:string, purchasePolicyLevelStateFacade?:PurchasePolicyLevelStateFacade, purchasePolicyTypeFacades?: PurchasePolicyTypeFacade[]){
    super(type, purchasePolicyLevelStateFacade);
    this.purchasePolicyTypeFacades = purchasePolicyTypeFacades;
  }

  deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this,value);
      this.purchasePolicyLevelStateFacade = new ObjectsDeserializer().getPurchasePolicyLevelStateFacade(value.purchasePolicyLevelStateFacade);
      this.purchasePolicyTypeFacades = [];
      for (const policyType of value.purchasePolicyTypeFacades){
        const policyTypeObj = new ObjectsDeserializer().getPurchasePolicyTypeFacade(policyType);
        this.purchasePolicyTypeFacades.push(policyTypeObj);
      }
      return this;
  }
}
