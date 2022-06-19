import { PurchasePolicyLevelStateFacade } from "./purchase-policy-level-state-facade";
import { PurchasePolicyTypeWrapper } from "./Wrappers/purchase-policy-type-wrapper";

export abstract class PurchasePolicyTypeFacade {
  type:string
  purchasePolicyLevelStateFacade:PurchasePolicyLevelStateFacade;
  constructor(type?:string,purchasePolicyLevelStateFacade?:PurchasePolicyLevelStateFacade){
    this.type = type? type : "";
    this.purchasePolicyLevelStateFacade = purchasePolicyLevelStateFacade? purchasePolicyLevelStateFacade : undefined;
  }

  abstract getWrapper():PurchasePolicyTypeWrapper;

}
