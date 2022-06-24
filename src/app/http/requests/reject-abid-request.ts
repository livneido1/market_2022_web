import { Deserializable } from "../facadeObjects/deserializable";

export class RejectABidRequest implements Deserializable {
  opposed:string;
  buyer:string;
  shopName:string;
  itemId: number;
  constructor(
    opposed?:string,
    buyer?:string,
    shopName?:string,
    itemId?:number){
      this.opposed = opposed;
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
