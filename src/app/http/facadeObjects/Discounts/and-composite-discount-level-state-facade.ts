import { Deserializable } from "../deserializable";
import { ObjectsDeserializer } from "../objects-deserializer";
import { CompositeDiscountLevelStateFacade } from "./composite-discount-level-state-facade";
import { DiscountLevelStateFacade } from "./discount-level-state-facade";

export class AndCompositeDiscountLevelStateFacade  extends CompositeDiscountLevelStateFacade  implements Deserializable{

  constructor(discountLevelStateFacades?: DiscountLevelStateFacade[]){
    super("AndCompositeDiscountLevelStateFacade" ,"&& of Discounts",  discountLevelStateFacades);
  }


  override deserialize(value: any): this {
    if (!value){
      return this;
    }
    Object.assign(this,value);
    this.discountLevelStateFacades = [];
    for (const cond of value.discountLevelStateFacades){
      const condObj = new ObjectsDeserializer().getDiscountLevelStateFacade(cond);
      this.discountLevelStateFacades.push(condObj);
    }
    return this;
  }

}
