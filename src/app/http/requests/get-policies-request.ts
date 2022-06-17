import { Deserializable } from '../facadeObjects/deserializable';

export class GetPoliciesRequest implements Deserializable {
  visitorName: string;
  shopName: string;
  constructor(visitorName?: string, shopName?: string) {
    this.visitorName = visitorName;
    this.shopName = shopName;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
