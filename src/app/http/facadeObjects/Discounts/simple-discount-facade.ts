import { Deserializable } from '../deserializable';
import { DiscountLevelStateFacade } from './discount-level-state-facade';
import { DiscountTypeFacade } from './discount-type-facade';

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
}
