import { DiscountLevelStateFacade } from './discount-level-state-facade';
import { DiscountTypeWrapper } from './Wrappers/discount-type-wrapper';

export abstract class DiscountTypeFacade {
  type: string;
  percentageOfDiscount: number;
  discountLevelState: DiscountLevelStateFacade;
  title:string;
  
  constructor(
    type?: string,
    title?:string,
    percentageOfDiscount?: number,
    discountLevelState?: DiscountLevelStateFacade
  ) {
    this.type = type ? type : "";
    this.title = title;
    this.percentageOfDiscount = percentageOfDiscount
      ? percentageOfDiscount
      : -1;
    this.discountLevelState = discountLevelState
      ? discountLevelState
      : undefined;
  }


  abstract getWrapper():DiscountTypeWrapper;

  abstract getString():string;
}
