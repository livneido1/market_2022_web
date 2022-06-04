import { Deserializable } from '../deserializable';
import { DiscountTypeFacade } from './discount-type-facade';

export class SimpleDiscountFacade
  extends DiscountTypeFacade
  implements Deserializable
{
  constructor() {
    super('SimpleDiscountFacade');
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
