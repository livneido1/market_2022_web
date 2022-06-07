import { DiscountLevelStateFacade } from './discount-level-state-facade';

export class CompositeLevelStateTest extends DiscountLevelStateFacade {
  discountList: DiscountLevelStateFacade[];
  operator:string;
  constructor(discountList?: DiscountLevelStateFacade[], operator?:string) {
    super('CompositeLevelStateTest');
    this.discountList = discountList ? discountList : [];
    this.operator = operator? operator : "";
  }
}
