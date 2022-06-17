import { Deserializable } from "../../deserializable";
import { Category } from "../../ItemFacade";
import { AndCompositeConditionFacade } from "../and-composite-condition-facade";
import { AndCompositeDiscountLevelStateFacade } from "../and-composite-discount-level-state-facade";
import { CategoryLevelStateFacade } from "../category-level-state-facade";
import { DiscountLevelStateFacade } from "../discount-level-state-facade";
import { ItemLevelStateFacade } from "../item-level-state-facade";
import { MaxXorCompositeDiscountLevelStateFacade } from "../max-xor-composite-discount-level-state-facade";
import { ShopLevelStateFacade } from "../shop-level-state-facade";

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

  getDiscountLevelState():DiscountLevelStateFacade{
    switch (this.discountLevelStateWrapperType){
      case DiscountLevelStateWrapperType.ShopLevelStateFacade:
        return new ShopLevelStateFacade();
      case DiscountLevelStateWrapperType.ItemLevelStateFacade:
        return new ItemLevelStateFacade(this.itemID);
      case DiscountLevelStateWrapperType.CategoryLevelStateFacade:
        return new CategoryLevelStateFacade(this.category);
      case DiscountLevelStateWrapperType.AndCompositeDiscountLevelStateFacade:
        const subLevels1: DiscountLevelStateFacade[] = this.getSubLevels();
        return new AndCompositeDiscountLevelStateFacade(subLevels1);
      case DiscountLevelStateWrapperType.MaxXorCompositeDiscountLevelStateFacade:
        const subLevels: DiscountLevelStateFacade[] = this.getSubLevels();
        return new MaxXorCompositeDiscountLevelStateFacade(subLevels)
      default:
        return undefined;
    }
  }

  private getSubLevels() {
    const subLevels: DiscountLevelStateFacade[] = [];
    for (const wrapper of this.discountLevelStateWrappers) {
      subLevels.push(wrapper.getDiscountLevelState());
    }
    return subLevels;
  }
}
