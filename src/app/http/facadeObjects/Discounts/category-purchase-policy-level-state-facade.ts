import { Deserializable } from "../deserializable";
import { Category } from "../ItemFacade";
import { PurchasePolicyLevelStateFacade } from "./purchase-policy-level-state-facade";

export class CategoryPurchasePolicyLevelStateFacade extends PurchasePolicyLevelStateFacade implements Deserializable{
  category: Category;
  constructor(category?:Category){
    super("CategoryPurchasePolicyLevelStateFacade");
    this.category = category;
  }

  deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this, value);
      return this;
  }
}
