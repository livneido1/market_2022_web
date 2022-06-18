import { Deserializable } from '../../deserializable';
import { Category } from '../../ItemFacade';
import { AndCompositePurchasePolicyLevelStateFacade } from '../and-composite-purchase-policy-level-state-facade';
import { CategoryPurchasePolicyLevelStateFacade } from '../category-purchase-policy-level-state-facade';
import { ItemPurchasePolicyLevelStateFacade } from '../item-purchase-policy-level-state-facade';
import { OrCompositePurchasePolicyLevelStateFacade } from '../or-composite-purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateFacade } from '../purchase-policy-level-state-facade';
import { ShopPurchasePolicyLevelStateFacade } from '../shop-purchase-policy-level-state-facade';
import { XorCompositePurchasePolicyLevelStateFacade } from '../xor-composite-purchase-policy-level-state-facade';

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

  getPurchaseLevelState(): PurchasePolicyLevelStateFacade {
    switch (this.purchasePolicyLevelStateWrapperType) {
      case PurchasePolicyLevelStateWrapperType.CategoryPurchasePolicyLevelStateFacade:
        return new CategoryPurchasePolicyLevelStateFacade(this.category);
      case PurchasePolicyLevelStateWrapperType.ItemPurchasePolicyLevelStateFacade:
        return new ItemPurchasePolicyLevelStateFacade(this.itemID);
      case PurchasePolicyLevelStateWrapperType.ShopPurchasePolicyLevelStateFacade:
        return new ShopPurchasePolicyLevelStateFacade();
      case PurchasePolicyLevelStateWrapperType.OrCompositePurchasePolicyLevelStateFacade:
        const subLevels_OrComposite = this.getSubLevelStates();
        return new OrCompositePurchasePolicyLevelStateFacade(subLevels_OrComposite);
      case PurchasePolicyLevelStateWrapperType.XorCompositePurchasePolicyLevelStateFacade:
        const subLevels_XOrComposite = this.getSubLevelStates();
        return new XorCompositePurchasePolicyLevelStateFacade(subLevels_XOrComposite);
      case PurchasePolicyLevelStateWrapperType.AndCompositePurchasePolicyLevelStateFacade:
        const subLevels_AndComposite = this.getSubLevelStates();
        return new AndCompositePurchasePolicyLevelStateFacade(subLevels_AndComposite);
      default:
        return undefined;
    }
  }

  getSubLevelStates():PurchasePolicyLevelStateFacade[]{
    const res:PurchasePolicyLevelStateFacade[] = [];
    for (const levelState of this.purchasePolicyLevelStateWrappers){
      res.push(levelState.getPurchaseLevelState());
    }
    return res;
  }

}
