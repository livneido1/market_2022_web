import { Deserializable } from '../../deserializable';
import { AtLeastPurchasePolicyTypeFacade } from '../at-least-purchase-policy-type-facade';
import { AtMostPurchasePolicyTypeFacade } from '../at-most-purchase-policy-type-facade';
import { OrCompositePurchasePolicyTypeFacade } from '../or-composite-purchase-policy-type-facade';
import { PurchasePolicyTypeFacade } from '../purchase-policy-type-facade';
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
      this.purchasePolicyTypeWrapperType =
        this.getPurchasePolicyTypeWrapperType(
          value.purchasePolicyTypeWrapperType
        );
      if (value.purchasePolicyLevelStateWrapper) {
        this.purchasePolicyLevelStateWrapper =
          new PurchasePolicyLevelStateWrapper().deserialize(
            value.purchasePolicyLevelStateWrapper
          );
      }
      this.purchasePolicyTypeWrappers = [];
      if (value.purchasePolicyTypeWrappers) {
        for (const dlw of value.purchasePolicyTypeWrappers) {
          this.purchasePolicyTypeWrappers.push(
            new PurchasePolicyTypeWrapper().deserialize(dlw)
          );
        }
      }
    }

    return this;
  }

  getPurchasePolicyTypeWrapperType(
    input: string
  ): PurchasePolicyTypeWrapperType {
    switch (input) {
      case 'OrCompositePurchasePolicyTypeFacade':
        return PurchasePolicyTypeWrapperType.OrCompositePurchasePolicyTypeFacade;
      case 'AtMostPurchasePolicyTypeFacade':
        return PurchasePolicyTypeWrapperType.AtLeastPurchasePolicyTypeFacade;
      case 'AtLeastPurchasePolicyTypeFacade':
        return PurchasePolicyTypeWrapperType.AtMostPurchasePolicyTypeFacade;
    }
    return undefined;
  }



  getPurchasePolicyType(): PurchasePolicyTypeFacade {
    switch (this.purchasePolicyTypeWrapperType) {
      case PurchasePolicyTypeWrapperType.AtLeastPurchasePolicyTypeFacade:
        const purchasePolicyLevelStateFacade = this.purchasePolicyLevelStateWrapper.getPurchaseLevelState();
        const levelState = this.purchasePolicyLevelStateWrapper.getPurchaseLevelState();
        return new AtLeastPurchasePolicyTypeFacade(this.amount,levelState);
        const levelState2 = this.purchasePolicyLevelStateWrapper.getPurchaseLevelState();
      case PurchasePolicyTypeWrapperType.AtMostPurchasePolicyTypeFacade:
        return new AtMostPurchasePolicyTypeFacade(this.amount,levelState2);
      case PurchasePolicyTypeWrapperType.OrCompositePurchasePolicyTypeFacade:
        return new OrCompositePurchasePolicyTypeFacade();
    }
  }

}
