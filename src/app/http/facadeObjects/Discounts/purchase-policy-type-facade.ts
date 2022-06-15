import { PurchasePolicyLevelStateFacade } from "./purchase-policy-level-state-facade";

export class PurchasePolicyTypeFacade {
  type:string
  purchasePolicyLevelStateFacade:PurchasePolicyLevelStateFacade;
  constructor(type?:string,purchasePolicyLevelStateFacade?:PurchasePolicyLevelStateFacade){
    this.type = type? type : "";
    this.purchasePolicyLevelStateFacade = purchasePolicyLevelStateFacade? purchasePolicyLevelStateFacade : undefined;
  }
}
