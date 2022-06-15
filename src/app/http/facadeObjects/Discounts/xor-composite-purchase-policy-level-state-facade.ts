import { Deserializable } from '../deserializable';
import { CompositePurchasePolicyLevelStateFacade } from './composite-purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';

export class XorCompositePurchasePolicyLevelStateFacade
  extends CompositePurchasePolicyLevelStateFacade
  implements Deserializable {
    constructor(purchasePolicyLevelStateFacades?:PurchasePolicyLevelStateFacade[]){
      super("XorCompositePurchasePolicyLevelStateFacade", purchasePolicyLevelStateFacades);
    }
  }
