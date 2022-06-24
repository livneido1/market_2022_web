import { Deserializable } from '../facadeObjects/deserializable';

export class CancelABidRequest implements Deserializable {
  buyer: string;
  shopName: string;
  itemId: number;
  constructor(buyer?: string, shopName?: string, itemId?: number) {
    this.buyer = buyer;
    this.shopName = shopName;
    this.itemId = itemId;
  }
  deserialize(value: any): this {
    if (value) {
      Object.assign(this, value);
    }
    return this;
  }
}
