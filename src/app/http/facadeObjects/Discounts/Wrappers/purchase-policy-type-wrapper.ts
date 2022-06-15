import { Deserializable } from '../../deserializable';
import { PurchasePolicyLevelStateWrapper } from './purchase-policy-level-state-wrapper';

export enum PurchasePolicyTypeWrapperType {
  OrCompositePurchasePolicyTypeFacade,
  AtLeastPurchasePolicyTypeFacade,
  AtMostPurchasePolicyTypeFacade,
}

export class PurchasePolicyTypeWrapper implements Deserializable {
  purchasePolicyTypeWrapperType: PurchasePolicyTypeWrapperType;
  amount: number;
  purchasePolicyLevelStateWrapper: PurchasePolicyLevelStateWrapper;
  purchasePolicyTypeWrappers: PurchasePolicyTypeWrapper[];

  constructor(
    purchasePolicyTypeWrapperType?: PurchasePolicyTypeWrapperType,
    amount?: number,
    purchasePolicyLevelStateWrapper?: PurchasePolicyLevelStateWrapper,
    purchasePolicyTypeWrappers?: PurchasePolicyTypeWrapper[]
  ) {
    this.purchasePolicyTypeWrapperType = purchasePolicyTypeWrapperType;
    this.amount = amount;
    this.purchasePolicyLevelStateWrapper = purchasePolicyLevelStateWrapper;
    this.purchasePolicyTypeWrappers = purchasePolicyTypeWrappers;
  }

  deserialize(value: any): this {
    if (value) {
      Object.assign(this, value);
      this.purchasePolicyLevelStateWrapper  =
        new PurchasePolicyLevelStateWrapper().deserialize(
          value.purchasePolicyLevelStateWrapper
        );
      this.purchasePolicyTypeWrappers = [];
      for (const dlw of value.purchasePolicyTypeWrappers) {
        this.purchasePolicyTypeWrappers.push(
          new PurchasePolicyTypeWrapper().deserialize(dlw)
        );
      }
    }

    return this;
  }
}
