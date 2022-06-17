import { Deserializable } from '../deserializable';
import { ConditionFacade } from './condition-facade';
import {
  ConditionWrapper,
  ConditionWrapperType,
} from './Wrappers/condition-wrapper';

export class PriceConditionFacade
  extends ConditionFacade
  implements Deserializable
{
  price: number;

  constructor(price?: number) {
    super('PriceConditionFacade', 'Price Condition');
    this.price = price ? price : -1;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }

  getWrapper(): ConditionWrapper {
    return new ConditionWrapper(
      ConditionWrapperType.PriceConditionFacade,
      [],
      -1,
      -1,
      this.price
    );
  }
}
