import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { CompositePurchasePolicyLevelStateFacade } from './composite-purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';

export class AndCompositePurchasePolicyLevelStateFacade
  extends CompositePurchasePolicyLevelStateFacade
  implements Deserializable {

    constructor( purchasePolicyLevelStateFacades: PurchasePolicyLevelStateFacade[]){
      super("AndCompositePurchasePolicyLevelStateFacade",purchasePolicyLevelStateFacades);

    }

    override deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this,value);
      this.purchasePolicyLevelStateFacades = [];
      for (const cond of value.purchasePolicyLevelStateFacades){
        const condObj = new ObjectsDeserializer().getPurchasePolicyLevelStateFacade(cond);
        this.purchasePolicyLevelStateFacades.push(condObj);
      }
      return this;
    }
  }
