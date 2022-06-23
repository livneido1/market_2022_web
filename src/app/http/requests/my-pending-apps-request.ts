import { Deserializable } from "../facadeObjects/deserializable";

export class MyPendingAppsRequest implements Deserializable {
  shopName: string;
  ownerName: string;
  constructor(shopName?: string, ownerName?: string) {
    this.shopName = shopName;
    this.ownerName = ownerName;
  }

  deserialize(value: any): this {
      if (value){
        Object.assign(this,value);
      }
      return this;
  }
}
