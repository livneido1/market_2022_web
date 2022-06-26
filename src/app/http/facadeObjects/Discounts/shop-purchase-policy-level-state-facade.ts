import { Deserializable } from '../deserializable';
import { Category } from '../ItemFacade';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateWrapper, PurchasePolicyLevelStateWrapperType } from './Wrappers/purchase-policy-level-state-wrapper';

export class ShopPurchasePolicyLevelStateFacade
  extends PurchasePolicyLevelStateFacade
  implements Deserializable
{
  constructor() {
    super('ShopPurchasePolicyLevelStateFacade', 'Shop Level');
  }

  getWrapper(): PurchasePolicyLevelStateWrapper {
      return new PurchasePolicyLevelStateWrapper(
        PurchasePolicyLevelStateWrapperType.ShopPurchasePolicyLevelStateFacade,
        -1,
        Category.cellular,
        []
      )
  }

  getString(): string {
      return "All Shop Purchase Policy"
  }
}
