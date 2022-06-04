import { Deserializable } from '../deserializable';
import { ConditionFacade } from './condition-facade';

export class PriceConditionFacade
  extends ConditionFacade
  implements Deserializable
{
  price: number;

  constructor(price?: number) {
    super('PriceConditionFacade');
    this.price = price ? price : -1;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
