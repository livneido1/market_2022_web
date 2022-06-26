import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { CompositePurchasePolicyTypeFacade } from './composite-purchase-policy-type-facade';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';
import { PurchasePolicyTypeFacade } from './purchase-policy-type-facade';
import { ShopPurchasePolicyLevelStateFacade } from './shop-purchase-policy-level-state-facade';
import { PurchasePolicyTypeWrapper, PurchasePolicyTypeWrapperType } from './Wrappers/purchase-policy-type-wrapper';

export class OrCompositePurchasePolicyTypeFacade
  extends CompositePurchasePolicyTypeFacade
  implements Deserializable
{
  constructor(
    purchasePolicyLevelStateFacade?: PurchasePolicyLevelStateFacade,
    purchasePolicyTypeFacades?: PurchasePolicyTypeFacade[]
  ) {
    super(
      'OrCompositePurchasePolicyTypeFacade',
      'One Of Many Policies',
      purchasePolicyLevelStateFacade,
      purchasePolicyTypeFacades
    );
  }

  getWrapper(): PurchasePolicyTypeWrapper {
    const subWrappers: PurchasePolicyTypeWrapper[] = [];
    for (const policies of this.purchasePolicyTypeFacades) {
      subWrappers.push(policies.getWrapper());
    }
    const shopLevelFacade = new ShopPurchasePolicyLevelStateFacade().getWrapper();
    return new PurchasePolicyTypeWrapper(
      PurchasePolicyTypeWrapperType.OrCompositePurchasePolicyTypeFacade,
      -1,
      shopLevelFacade,
      subWrappers
    );
  }

  getString(): string {
      return "Info: To buy - must at least one of sub policies"
  }
}
