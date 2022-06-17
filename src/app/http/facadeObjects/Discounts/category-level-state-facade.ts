import { Deserializable } from "../deserializable";
import { Category } from "../ItemFacade";
import { DiscountLevelStateFacade } from "./discount-level-state-facade";
import { DiscountLevelStateWrapper, DiscountLevelStateWrapperType } from "./Wrappers/discount-level-state-wrapper";

export class CategoryLevelStateFacade extends DiscountLevelStateFacade implements Deserializable {

  category: Category;


  constructor(category?:Category){
    super("CategoryLevelStateFacade", "Category Level");

    this.category = category? category : undefined;
  }

  deserialize(value: any): this {
    if (!value){
      return this;
    }
    Object.assign(this,value);
    this.category = value.category;
    return this;
  }

  getWrapper(): DiscountLevelStateWrapper {
    return new DiscountLevelStateWrapper(
      DiscountLevelStateWrapperType.CategoryLevelStateFacade,
      -1,
      this.category,
      []
    )
}
}
