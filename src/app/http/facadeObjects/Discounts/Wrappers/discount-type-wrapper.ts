import { Deserializable } from '../../deserializable';
import { ConditionWrapper } from './condition-wrapper';
import { DiscountLevelStateWrapper } from './discount-level-state-wrapper';

export enum DiscountTypeWrapperType {
  MaxCompositeDiscountTypeFacade,
  SimpleDiscountFacade,
  ConditionalDiscountFacade,
}
export class DiscountTypeWrapper implements Deserializable {
  discountTypeWrapperType: DiscountTypeWrapperType;
  percentageOfDiscount: number;
  discountLevelStateWrapper: DiscountLevelStateWrapper;
  conditionWrapper: ConditionWrapper;
  discountTypeWrappers: DiscountTypeWrapper[];

  constructor(
    discountTypeWrapperType?: DiscountTypeWrapperType,
    percentageOfDiscount?: number,
    discountLevelStateWrapper?: DiscountLevelStateWrapper,
    conditionWrapper?: ConditionWrapper,
    discountTypeWrappers?: DiscountTypeWrapper[]
  ) {
    this.discountTypeWrapperType = discountTypeWrapperType;
    this.percentageOfDiscount = percentageOfDiscount;
    this.discountLevelStateWrapper = discountLevelStateWrapper;
    this.conditionWrapper = conditionWrapper;
    this.discountTypeWrappers = discountTypeWrappers;
  }
  deserialize(value: any): this {
    if (value) {
      Object.assign(this, value);
      this.discountLevelStateWrapper =
        new DiscountLevelStateWrapper().deserialize(
          value.discountLevelStateWrapper
        );
      this.conditionWrapper = new ConditionWrapper().deserialize(
        value.conditionWrapper
      );
      this.discountTypeWrappers = [];
      for (const dlw of value.discountTypeWrappers) {
        this.discountTypeWrappers.push(
          new DiscountTypeWrapper().deserialize(dlw)
        );
      }
    }

    return this;
  }
}
