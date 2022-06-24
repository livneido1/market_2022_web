import { Deserializable } from "../facadeObjects/deserializable";

export class AddABidRequest implements Deserializable {
  visitorName: string;
  shopName: string;
  itemId: number;
  price: number;
  amount: number;
  constructor(
    visitorName?: string,
    shopName?: string,
    itemId?: number,
    price?: number,
    amount?: number
  ) {
    this.visitorName = visitorName;
    this.shopName = shopName;
    this.itemId = itemId;
    this.price = price;
    this.amount = amount;
  }

  deserialize(value: any): this {
      if (value){
        Object.assign(this, value);
      }
      return this;
  }
}
