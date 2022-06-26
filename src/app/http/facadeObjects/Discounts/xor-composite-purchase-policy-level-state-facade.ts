import { Deserializable } from '../deserializable';
import { Category } from '../ItemFacade';
import { CompositePurchasePolicyLevelStateFacade } from './composite-purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateWrapper, PurchasePolicyLevelStateWrapperType } from './Wrappers/purchase-policy-level-state-wrapper';

export class XorCompositePurchasePolicyLevelStateFacade
  extends CompositePurchasePolicyLevelStateFacade
  implements Deserializable
{
  constructor(
    purchasePolicyLevelStateFacades?: PurchasePolicyLevelStateFacade[]
  ) {
    super(
      'XorCompositePurchasePolicyLevelStateFacade',
      'Exactly one',
      purchasePolicyLevelStateFacades
    );
  }

  getWrapper(): PurchasePolicyLevelStateWrapper {
    const subWrappers: PurchasePolicyLevelStateWrapper[] = [];
    for (const levelState of this.purchasePolicyLevelStateFacades) {
      subWrappers.push(levelState.getWrapper());
    }
    return new PurchasePolicyLevelStateWrapper(
      PurchasePolicyLevelStateWrapperType.XorCompositePurchasePolicyLevelStateFacade,
      -1,
      Category.cellular,
      subWrappers
    );
  }

  getString(): string {
      return "Exactly one of sub Policies Level must be held";
  }
}
