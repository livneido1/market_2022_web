import { Deserializable } from '../deserializable';
import { CompositeDiscountTypeFacade } from './composite-discount-type-facade';
import { DiscountTypeFacade } from './discount-type-facade';
import { DiscountTypeWrapper, DiscountTypeWrapperType } from './Wrappers/discount-type-wrapper';

export class MaxCompositeDiscountTypeFacade
  extends CompositeDiscountTypeFacade
  implements Deserializable {
    constructor(discountTypes?:DiscountTypeFacade[]){
      // todo implement full constructor here
      super("MaxCompositeDiscountTypeFacade",);
    }

    getWrapper(): DiscountTypeWrapper {
      const subWrappers:DiscountTypeWrapper[] = [];
      for (const discount of this.discountTypes){
        subWrappers.push(discount.getWrapper());
      }
      return new DiscountTypeWrapper(
        DiscountTypeWrapperType.MaxCompositeDiscountTypeFacade,
        this.percentageOfDiscount,
        this.discountLevelState.getWrapper(),
        null,
        subWrappers
      );
    }
  }


