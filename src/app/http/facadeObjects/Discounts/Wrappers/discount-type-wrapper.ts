import { Deserializable } from '../../deserializable';
import { ConditionalDiscountFacade } from '../conditional-discount-facade';
import { DiscountTypeFacade } from '../discount-type-facade';
import { MaxCompositeDiscountTypeFacade } from '../max-composite-discount-type-facade';
import { SimpleDiscountFacade } from '../simple-discount-facade';
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



  getDiscountType():DiscountTypeFacade{
    switch (this.discountTypeWrapperType){
      case DiscountTypeWrapperType.ConditionalDiscountFacade:
        return new ConditionalDiscountFacade(this.percentageOfDiscount,
          this.discountLevelStateWrapper.getDiscountLevelState(),
          this.conditionWrapper.getCondition());
      case DiscountTypeWrapperType.SimpleDiscountFacade:
        return new SimpleDiscountFacade(this.percentageOfDiscount,this.discountLevelStateWrapper.getDiscountLevelState());
      case DiscountTypeWrapperType.MaxCompositeDiscountTypeFacade:
        const subDiscountTypes: DiscountTypeFacade[] = this.getSubDiscounts();
        return new MaxCompositeDiscountTypeFacade(subDiscountTypes);
    }
  }

  private getSubDiscounts() {
    const subDiscountTypes: DiscountTypeFacade[] = [];
    for (const wrapper of this.discountTypeWrappers) {
      subDiscountTypes.push(wrapper.getDiscountType());
    }
    return subDiscountTypes;
  }
} 
