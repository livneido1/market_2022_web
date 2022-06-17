import { Deserializable } from '../deserializable';
import { Category } from '../ItemFacade';
import { CompositeDiscountLevelStateFacade } from './composite-discount-level-state-facade';
import { DiscountLevelStateFacade } from './discount-level-state-facade';
import { DiscountTypeFacade } from './discount-type-facade';
import {
  DiscountLevelStateWrapper,
  DiscountLevelStateWrapperType,
} from './Wrappers/discount-level-state-wrapper';

export class MaxXorCompositeDiscountLevelStateFacade
  extends CompositeDiscountLevelStateFacade
  implements Deserializable
{
  constructor(discountTypes?: DiscountLevelStateFacade[]) {
    // todo implement full constructor here
    super(
      'MaxXorCompositeDiscountLevelStateFacade',
      'Max Of Discounts',
      discountTypes
    );
  }

  getWrapper(): DiscountLevelStateWrapper {
    const subWrappers: DiscountLevelStateWrapper[] = [];
    for (const level of this.discountLevelStateFacades) {
      subWrappers.push(level.getWrapper());
    }
    return new DiscountLevelStateWrapper(
      DiscountLevelStateWrapperType.MaxXorCompositeDiscountLevelStateFacade,
      -1,
      Category.general,
      subWrappers
    );
  }
}
