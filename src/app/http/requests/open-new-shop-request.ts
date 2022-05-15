import { Deserializable } from "../facadeObjects/deserializable";

export class OpenNewShopRequest implements Deserializable {
  memberName: string;
  shopName: string;
  constructor() {
    this.memberName = '';
    this.shopName = '';
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
