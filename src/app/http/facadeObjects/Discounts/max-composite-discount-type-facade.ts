import { Deserializable } from '../deserializable';
import { CompositeDiscountTypeFacade } from './composite-discount-type-facade';
import { DiscountTypeFacade } from './discount-type-facade';
import { ShopLevelStateFacade } from './shop-level-state-facade';
import {
  DiscountTypeWrapper,
  DiscountTypeWrapperType,
} from './Wrappers/discount-type-wrapper';

export class MaxCompositeDiscountTypeFacade
  extends CompositeDiscountTypeFacade
  implements Deserializable
{
  constructor(discountTypes?: DiscountTypeFacade[]) {
    // todo implement full constructor here
    super(
      'MaxCompositeDiscountTypeFacade',
      'Max of Discounts',
      -1,
      new ShopLevelStateFacade(),
      discountTypes
    );
  }

  getWrapper(): DiscountTypeWrapper {
    const subWrappers: DiscountTypeWrapper[] = [];
    for (const discount of this.discountTypes) {
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

  getString(): string {
      return "Takes Best of Discounts";
  }
}
