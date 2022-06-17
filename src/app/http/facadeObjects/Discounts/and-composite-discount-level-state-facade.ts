import { Deserializable } from '../deserializable';
import { Category } from '../ItemFacade';
import { ObjectsDeserializer } from '../objects-deserializer';
import { CompositeDiscountLevelStateFacade } from './composite-discount-level-state-facade';
import { DiscountLevelStateFacade } from './discount-level-state-facade';
import {
  DiscountLevelStateWrapper,
  DiscountLevelStateWrapperType,
} from './Wrappers/discount-level-state-wrapper';

export class AndCompositeDiscountLevelStateFacade
  extends CompositeDiscountLevelStateFacade
  implements Deserializable
{
  constructor(discountLevelStateFacades?: DiscountLevelStateFacade[]) {
    super(
      'AndCompositeDiscountLevelStateFacade',
      '&& of Discounts',
      discountLevelStateFacades
    );
  }

  override deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.discountLevelStateFacades = [];
    for (const cond of value.discountLevelStateFacades) {
      const condObj = new ObjectsDeserializer().getDiscountLevelStateFacade(
        cond
      );
      this.discountLevelStateFacades.push(condObj);
    }
    return this;
  }

  getWrapper(): DiscountLevelStateWrapper {
    const subWrappers: DiscountLevelStateWrapper[] = [];
    for (const level of this.discountLevelStateFacades){
      subWrappers.push(level.getWrapper());
    }
    return new DiscountLevelStateWrapper(
      DiscountLevelStateWrapperType.AndCompositeDiscountLevelStateFacade,
      -1,
      Category.general,
      subWrappers
    );
  }
}
