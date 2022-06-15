import { Deserializable } from "../deserializable";
import { DiscountLevelStateFacade } from "./discount-level-state-facade";

export class ShopLevelStateFacade extends DiscountLevelStateFacade  implements Deserializable {


  constructor(){
    super("ShopLevelStateFacade", "Shop Level");
  }



  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
