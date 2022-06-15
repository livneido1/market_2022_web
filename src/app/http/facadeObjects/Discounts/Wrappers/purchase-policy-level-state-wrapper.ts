import { Deserializable } from '../../deserializable';
import { Category } from '../../ItemFacade';

export enum PurchasePolicyLevelStateWrapperType {
  AndCompositePurchasePolicyLevelStateFacade,
  XorCompositePurchasePolicyLevelStateFacade,
  OrCompositePurchasePolicyLevelStateFacade,
  CategoryPurchasePolicyLevelStateFacade,
  ItemPurchasePolicyLevelStateFacade,
  ShopPurchasePolicyLevelStateFacade,
}
export class PurchasePolicyLevelStateWrapper implements Deserializable {
  purchasePolicyLevelStateWrapperType: PurchasePolicyLevelStateWrapperType;
  itemID: number;
  category: Category;
  purchasePolicyLevelStateWrappers: PurchasePolicyLevelStateWrapper[];

  constructor(
    purchasePolicyLevelStateWrapperType?: PurchasePolicyLevelStateWrapperType,
    itemID?: number,
    category?: Category,
    purchasePolicyLevelStateWrappers?: PurchasePolicyLevelStateWrapper[]
  ) {
    this.purchasePolicyLevelStateWrapperType =
      purchasePolicyLevelStateWrapperType;
    this.itemID = itemID;
    this.category = category;
    this.purchasePolicyLevelStateWrappers = purchasePolicyLevelStateWrappers;
  }

  deserialize(value: any): this {
    if (value) {
      Object.assign(this, value);
      this.purchasePolicyLevelStateWrappers = [];
      for (const dlw of value.purchasePolicyLevelStateWrappers) {
        this.purchasePolicyLevelStateWrappers.push(
          new PurchasePolicyLevelStateWrapper().deserialize(dlw)
        );
      }
    }

    return this;
  }
}
