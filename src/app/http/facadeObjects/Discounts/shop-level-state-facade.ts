import { Deserializable } from "../deserializable";
import { Category } from "../ItemFacade";
import { DiscountLevelStateFacade } from "./discount-level-state-facade";
import { DiscountLevelStateWrapper, DiscountLevelStateWrapperType } from "./Wrappers/discount-level-state-wrapper";

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

  getWrapper(): DiscountLevelStateWrapper {
      return new DiscountLevelStateWrapper(
        DiscountLevelStateWrapperType.ShopLevelStateFacade,
        -1,
        Category.general,
        []
      )
  }
}
