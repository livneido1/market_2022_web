import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';

export abstract class CompositePurchasePolicyLevelStateFacade
  extends PurchasePolicyLevelStateFacade
  implements Deserializable
{
  purchasePolicyLevelStateFacades: PurchasePolicyLevelStateFacade[];
  constructor(
    type?: string,
    purchasePolicyLevelStateFacades?: PurchasePolicyLevelStateFacade[]
  ) {
    super(type);
    this.purchasePolicyLevelStateFacades = purchasePolicyLevelStateFacades
      ? purchasePolicyLevelStateFacades
      : [];
  }

  override deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.purchasePolicyLevelStateFacades = [];
    const deserializer = new ObjectsDeserializer();
    for (const policy of value.purchasePolicyLevelStateFacades) {
      const policyDeserilazed =
        deserializer.getPurchasePolicyLevelStateFacade(policy);
      this.purchasePolicyLevelStateFacades.push(policyDeserilazed);
    }
    return this;
  }

}
