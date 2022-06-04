import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { DiscountLevelStateFacade } from './discount-level-state-facade';
import { DiscountTypeFacade } from './discount-type-facade';

export enum CompositeDiscountType {
  max,
  kindOf,
}

export class CompositeDiscountFacade
  extends DiscountTypeFacade
  implements Deserializable
{
  discountTypes: DiscountTypeFacade[];
  compositeDiscountType: CompositeDiscountType;
  constructor(
    percentageOfDiscount?: number,
    discountLevelState?: DiscountLevelStateFacade,
    discountTypes?: DiscountTypeFacade[],
    compositeDiscountType?: CompositeDiscountType
  ) {
    super("CompositeDiscountFacade" ,percentageOfDiscount, discountLevelState);
    this.discountTypes = discountTypes ? discountTypes : undefined;
    this.compositeDiscountType = compositeDiscountType
      ? compositeDiscountType
      : undefined;
  }
  deserialize(value: any): this {
    if (!value){
      return this;
    }
    Object.assign(this,value);
    const deserializer = new ObjectsDeserializer();
    this.discountLevelState = deserializer.getDiscountLevelStateFacade(value.discountLevelState);
    this.discountTypes  = [];
    for (const discType of value.discountTypes){
      this.discountTypes.push(deserializer.getDiscountType(discType));
    }
    this.type = "CompositeDiscountFacade"
    this.compositeDiscountType = value.compositeDiscountType;
    return this;
  }
}
