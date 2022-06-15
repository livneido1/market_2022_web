import { Deserializable } from '../deserializable';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';

export class ShopPurchasePolicyLevelStateFacade
  extends PurchasePolicyLevelStateFacade
  implements Deserializable
{
  constructor() {
    super('ShopPurchasePolicyLevelStateFacade');
  }
}
