import { Deserializable } from '../facadeObjects/deserializable';
import { PurchasePolicyTypeWrapper } from '../facadeObjects/Discounts/Wrappers/purchase-policy-type-wrapper';

export class RemovePurchasePolicyFromShopRequest implements Deserializable {
  purchasePolicyTypeFacade: PurchasePolicyTypeWrapper;
  shopName: string;
  visitorName: string;

  constructor(
    purchasePolicyTypeFacade?: PurchasePolicyTypeWrapper,
    shopName?: string,
    visitorName?: string
  ) {
    this.purchasePolicyTypeFacade = purchasePolicyTypeFacade;
    this.shopName = shopName;
    this.visitorName = visitorName;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.purchasePolicyTypeFacade = new PurchasePolicyTypeWrapper().deserialize(
      value.purchasePolicyTypeFacade
    );
    return this;
  }
}
