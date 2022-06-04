import { DiscountLevelStateFacade } from './discount-level-state-facade';

export abstract class DiscountTypeFacade {
  type: string;
  percentageOfDiscount: number;
  discountLevelState: DiscountLevelStateFacade;
  constructor(
    type?: string,
    percentageOfDiscount?: number,
    discountLevelState?: DiscountLevelStateFacade
  ) {
    this.type = type ? type : "";
    this.percentageOfDiscount = percentageOfDiscount
      ? percentageOfDiscount
      : -1;
    this.discountLevelState = discountLevelState
      ? discountLevelState
      : undefined;
  }
}
