import { Deserializable } from '../deserializable';
import { CompositeDiscountLevelStateFacade } from './composite-discount-level-state-facade';
import { DiscountLevelStateFacade } from './discount-level-state-facade';
import { DiscountTypeFacade } from './discount-type-facade';

export class MaxXorCompositeDiscountLevelStateFacade
  extends CompositeDiscountLevelStateFacade
  implements Deserializable {
    constructor(discountTypes?:DiscountLevelStateFacade[]){
      // todo implement full constructor here
      super("MaxXorCompositeDiscountLevelStateFacade", "Max Of Discounts", discountTypes);

    }
  }
