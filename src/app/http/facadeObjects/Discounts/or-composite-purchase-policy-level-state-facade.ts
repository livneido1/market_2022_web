import { Deserializable } from '../deserializable';
import { Category } from '../ItemFacade';
import { CompositePurchasePolicyLevelStateFacade } from './composite-purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';
import {
  PurchasePolicyLevelStateWrapper,
  PurchasePolicyLevelStateWrapperType,
} from './Wrappers/purchase-policy-level-state-wrapper';

export class OrCompositePurchasePolicyLevelStateFacade
  extends CompositePurchasePolicyLevelStateFacade
  implements Deserializable
{
  constructor(
    purchasePolicyLevelStateFacades?: PurchasePolicyLevelStateFacade[]
  ) {
    super(
      'OrCompositePurchasePolicyLevelStateFacade',
      'Atleast One Of Many',
      purchasePolicyLevelStateFacades
    );
  }

  getWrapper(): PurchasePolicyLevelStateWrapper {
    const subWrappers: PurchasePolicyLevelStateWrapper[] = [];
    for (const levelState of this.purchasePolicyLevelStateFacades) {
      subWrappers.push(levelState.getWrapper());
    }
    return new PurchasePolicyLevelStateWrapper(
      PurchasePolicyLevelStateWrapperType.OrCompositePurchasePolicyLevelStateFacade,
      -1,
      Category.cellular,
      subWrappers
    );
  }

  getString(): string {
      return "At Least One Of All is needed"
  }
}
