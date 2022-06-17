import { Deserializable } from '../facadeObjects/deserializable';
import { DiscountTypeWrapper } from '../facadeObjects/Discounts/Wrappers/discount-type-wrapper';

export class AddDiscountToShopRequest implements Deserializable {
  discount: DiscountTypeWrapper;
  shopName: string;
  visitorName: string;

  constructor(
    discount?: DiscountTypeWrapper,
    shopName?: string,
    visitorName?: string
  ) {
    this.discount = discount;
    this.shopName = shopName;
    this.visitorName = visitorName;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.discount = new DiscountTypeWrapper().deserialize(value.discount);
    return this;
  }
}
