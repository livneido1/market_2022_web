import { DiscountLevelStateWrapper } from "./Wrappers/discount-level-state-wrapper";


export abstract class DiscountLevelStateFacade {
  type:string;
  title:string;
  constructor(type?:string, title?:string){
    this.type = type? type: "";
    this.title = title;
  }


  abstract getWrapper(): DiscountLevelStateWrapper;
}
