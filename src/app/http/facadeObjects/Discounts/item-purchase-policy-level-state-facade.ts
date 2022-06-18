import { Deserializable } from '../deserializable';
import { Category } from '../ItemFacade';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateWrapper, PurchasePolicyLevelStateWrapperType } from './Wrappers/purchase-policy-level-state-wrapper';

export class ItemPurchasePolicyLevelStateFacade
  extends PurchasePolicyLevelStateFacade
  implements Deserializable
{
  itemID: number;
  constructor(itemID?: number) {
    super('ItemPurchasePolicyLevelStateFacade');
    this.itemID = itemID;
  }

  getWrapper(): PurchasePolicyLevelStateWrapper {
    return new PurchasePolicyLevelStateWrapper(
      PurchasePolicyLevelStateWrapperType.OrCompositePurchasePolicyLevelStateFacade,
      this.itemID,
      Category.cellular,
      []
    );
  }
}
