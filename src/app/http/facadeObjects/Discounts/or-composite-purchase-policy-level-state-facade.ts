import { Deserializable } from '../deserializable';
import { CompositePurchasePolicyLevelStateFacade } from './composite-purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';

export class OrCompositePurchasePolicyLevelStateFacade
  extends CompositePurchasePolicyLevelStateFacade
  implements Deserializable {
    constructor(purchasePolicyLevelStateFacades?:PurchasePolicyLevelStateFacade[]){
      super("OrCompositePurchasePolicyLevelStateFacade",purchasePolicyLevelStateFacades);
    }
  }
