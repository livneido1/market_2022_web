export abstract class ConditionFacade {
  type:string;

  constructor(type?:string){
    this.type = type? type: "";
  };
}
