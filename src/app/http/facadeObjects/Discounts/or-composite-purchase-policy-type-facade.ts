import { Deserializable } from '../deserializable';
import { CompositePurchasePolicyTypeFacade } from './composite-purchase-policy-type-facade';

export class OrCompositePurchasePolicyTypeFacade
  extends CompositePurchasePolicyTypeFacade
  implements Deserializable {
    constructor(){
      super("OrCompositePurchasePolicyTypeFacade");
    }
  }
