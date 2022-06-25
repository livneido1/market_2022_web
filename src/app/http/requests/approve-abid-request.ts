import { Deserializable } from "../facadeObjects/deserializable";

export class ApproveABidRequest implements Deserializable {
  approves: string;
  shopName: string;
  askedBy: string;
  itemId: number;
  constructor(
    approves?: string,
    shopName?: string,
    askedBy?: string,
    itemId?: number)
    {
      this.approves = approves;
      this.shopName = shopName;
      this.askedBy = askedBy;
      this.itemId = itemId;
    }
    deserialize(value: any): this {
      if (value){
        Object.assign(this, value);
      }
      return this;
  }
}
