import { Deserializable } from '../facadeObjects/deserializable';

export class SuggestNewOfferToBidRequest implements Deserializable {
  shopName: string;
  suggester: string;
  askedBy: string;
  itemId: number;
  newPrice: number;
  constructor(
    shopName?: string,
    suggester?: string,
    askedBy?: string,
    itemId?: number,
    newPrice?: number
  ) {
    this.shopName = shopName;
    this.suggester = suggester;
    this.askedBy = askedBy;
    this.itemId = itemId;
    this.newPrice = newPrice;
  }
  deserialize(value: any): this {
    if (value) {
      Object.assign(this, value);
    }
    return this;
  }
}
