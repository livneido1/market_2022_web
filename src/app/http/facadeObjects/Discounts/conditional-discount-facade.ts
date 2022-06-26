import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { ConditionFacade } from './condition-facade';
import { DiscountLevelStateFacade } from './discount-level-state-facade';
import { DiscountTypeFacade } from './discount-type-facade';
import {
  DiscountTypeWrapper,
  DiscountTypeWrapperType,
} from './Wrappers/discount-type-wrapper';

export class ConditionalDiscountFacade
  extends DiscountTypeFacade
  implements Deserializable
{
  conditionFacade: ConditionFacade;

  constructor(
    percentageOfDiscount?: number,
    discountLevelState?: DiscountLevelStateFacade,
    conditionFacade?: ConditionFacade
  ) {
    super(
      'ConditionalDiscountFacade',
      'Conditional Discount',
      percentageOfDiscount,
      discountLevelState
    );
    this.conditionFacade = conditionFacade ? conditionFacade : undefined;
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.percentageOfDiscount = value.percentageOfDiscount;
    const deserializer = new ObjectsDeserializer();

    this.discountLevelState = deserializer.getDiscountLevelStateFacade(
      value.discountLevelState
    );
    this.conditionFacade = deserializer.getConditionFacade(
      value.conditionFacade
    );
    return this;
  }

  getWrapper(): DiscountTypeWrapper {
    return new DiscountTypeWrapper(
      DiscountTypeWrapperType.ConditionalDiscountFacade,
      this.percentageOfDiscount,
      this.discountLevelState.getWrapper(),
      this.conditionFacade.getWrapper(),
      []
    );
  }

  getString(): string {
      return  "percentage:" + this.percentageOfDiscount +"\n" + 
              "level:" + this.discountLevelState.title +"\n"  
  }
}
