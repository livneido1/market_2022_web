

export class DiscountLevelStateFacade {
  type:string;
  title:string;
  constructor(type?:string, title?:string){
    this.type = type? type: "";
    this.title = title;
  }

}
