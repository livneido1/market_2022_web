import { Deserializable } from "../../deserializable";
import { Category } from "../../ItemFacade";

export enum DiscountLevelStateWrapperType {
  MaxXorCompositeDiscountLevelStateFacade,
  AndCompositeDiscountLevelStateFacade,
  ItemLevelStateFacade,
  ShopLevelStateFacade,
  CategoryLevelStateFacade
}

export class DiscountLevelStateWrapper implements Deserializable {

  discountLevelStateWrapperType: DiscountLevelStateWrapperType;
  itemID: number;
  category: Category;
  discountLevelStateWrappers: DiscountLevelStateWrapper[];
  constructor(
    discountLevelStateWrapperType?: DiscountLevelStateWrapperType,
    itemID?: number,
    category?: Category,
    discountLevelStateWrappers?: DiscountLevelStateWrapper[],
  ){
    this.discountLevelStateWrapperType = discountLevelStateWrapperType;
    this.itemID = itemID;
    this.category = category;
    this.discountLevelStateWrappers = discountLevelStateWrappers;
  }

  
  deserialize(value: any): this {
    if (value) {
      Object.assign(this, value);
      this.discountLevelStateWrappers = [];
      for (const dlw of value.discountLevelStateWrappers) {
        this.discountLevelStateWrappers.push(
          new DiscountLevelStateWrapper().deserialize(dlw)
        );
      }
    }

    return this;
  }
}
