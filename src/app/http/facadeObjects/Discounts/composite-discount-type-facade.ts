import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { DiscountLevelStateFacade } from './discount-level-state-facade';
import { DiscountTypeFacade } from './discount-type-facade';

export class CompositeDiscountTypeFacade
  extends DiscountTypeFacade
  implements Deserializable
{
  discountTypes: DiscountTypeFacade[];
  constructor(
    type?: string,
    percentageOfDiscount?: number,
    discountLevelState?: DiscountLevelStateFacade,
    discountTypes?: DiscountTypeFacade[]
  ) {
    super(type, percentageOfDiscount, discountLevelState);
    this.discountTypes = discountTypes;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.discountLevelState =
      new ObjectsDeserializer().getDiscountLevelStateFacade(
        value.discountLevelState
      );
    this.discountTypes = [];
    for (const discType of value.discountTypes){
      const deserialized = new ObjectsDeserializer().getDiscountType(discType);
      this.discountTypes.push(deserialized);
    }
    return this;
  }
}
