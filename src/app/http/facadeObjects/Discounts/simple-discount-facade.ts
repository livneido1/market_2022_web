import { Deserializable } from '../deserializable';
import { DiscountLevelStateFacade } from './discount-level-state-facade';
import { DiscountTypeFacade } from './discount-type-facade';
import { DiscountTypeWrapper, DiscountTypeWrapperType } from './Wrappers/discount-type-wrapper';

export class SimpleDiscountFacade
  extends DiscountTypeFacade
  implements Deserializable
{
  constructor(
    percentageOfDiscount?: number,
    discountLevelState?: DiscountLevelStateFacade
  ) {
    super('SimpleDiscountFacade', percentageOfDiscount, discountLevelState);
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }

  getWrapper(): DiscountTypeWrapper {
    return new DiscountTypeWrapper(
      DiscountTypeWrapperType.SimpleDiscountFacade,
      this.percentageOfDiscount,
      this.discountLevelState.getWrapper(),
      null,
      []
    );
  }
}
