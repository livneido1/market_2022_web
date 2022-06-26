import { PurchasePolicyLevelStateFacade } from "./purchase-policy-level-state-facade";
import { PurchasePolicyTypeWrapper } from "./Wrappers/purchase-policy-type-wrapper";

export abstract class PurchasePolicyTypeFacade {
  type:string;
  title?:string;
  purchasePolicyLevelStateFacade:PurchasePolicyLevelStateFacade;
  constructor(type?:string,title?:string,purchasePolicyLevelStateFacade?:PurchasePolicyLevelStateFacade){
    this.type = type? type : "";
    this.title = title;
    this.purchasePolicyLevelStateFacade = purchasePolicyLevelStateFacade? purchasePolicyLevelStateFacade : undefined;
  }

  abstract getWrapper():PurchasePolicyTypeWrapper;
  abstract getString():string;
}
