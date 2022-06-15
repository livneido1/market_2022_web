import { Deserializable } from '../deserializable';
import { CompositeDiscountTypeFacade } from './composite-discount-type-facade';
import { DiscountTypeFacade } from './discount-type-facade';

export class MaxCompositeDiscountTypeFacade
  extends CompositeDiscountTypeFacade
  implements Deserializable {
    constructor(discountTypes?:DiscountTypeFacade[]){
      // todo implement full constructor here
      super("MaxCompositeDiscountTypeFacade",);
    }
  }
