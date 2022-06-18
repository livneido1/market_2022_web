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
      this.purchasePolicyLevelStateWrapperType =
        this.getPurchasePolicyLevelStateWrapperType(
          value.purchasePolicyLevelStateWrapperType
        );
      this.purchasePolicyLevelStateWrappers = [];
      if (value.purchasePolicyLevelStateWrappers) {
        for (const dlw of value.purchasePolicyLevelStateWrappers) {
          this.purchasePolicyLevelStateWrappers.push(
            new PurchasePolicyLevelStateWrapper().deserialize(dlw)
          );
        }
      }
    }

    return this;
  }

  getPurchasePolicyLevelStateWrapperType(
    input: string
  ): PurchasePolicyLevelStateWrapperType {
    switch (input) {
      case 'AndCompositePurchasePolicyLevelStateFacade':
        return PurchasePolicyLevelStateWrapperType.AndCompositePurchasePolicyLevelStateFacade;
      case 'XorCompositePurchasePolicyLevelStateFacade':
        return PurchasePolicyLevelStateWrapperType.XorCompositePurchasePolicyLevelStateFacade;
      case 'OrCompositePurchasePolicyLevelStateFacade':
        return PurchasePolicyLevelStateWrapperType.OrCompositePurchasePolicyLevelStateFacade;
      case 'CategoryPurchasePolicyLevelStateFacade':
        return PurchasePolicyLevelStateWrapperType.CategoryPurchasePolicyLevelStateFacade;
      case 'ItemPurchasePolicyLevelStateFacade':
        return PurchasePolicyLevelStateWrapperType.ItemPurchasePolicyLevelStateFacade;
      case 'ShopPurchasePolicyLevelStateFacade':
        return PurchasePolicyLevelStateWrapperType.ShopPurchasePolicyLevelStateFacade;
    }
    return undefined;
  }
}
