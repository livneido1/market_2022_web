import { Deserializable } from '../deserializable';
import { Category } from '../ItemFacade';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateWrapper, PurchasePolicyLevelStateWrapperType } from './Wrappers/purchase-policy-level-state-wrapper';

export class CategoryPurchasePolicyLevelStateFacade
  extends PurchasePolicyLevelStateFacade
  implements Deserializable
{
  category: Category;
  constructor(category?: Category) {
    super('CategoryPurchasePolicyLevelStateFacade');
    this.category = category;
  }

  override deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }

  getWrapper(): PurchasePolicyLevelStateWrapper {
    return new PurchasePolicyLevelStateWrapper(
      PurchasePolicyLevelStateWrapperType.CategoryPurchasePolicyLevelStateFacade,
      -1,
      this.category,
      []
    );
  }
}
