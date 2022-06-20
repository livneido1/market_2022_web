import { Deserializable } from '../facadeObjects/deserializable';

export class TwoStringRequest implements Deserializable {
  name: string;
  shopName: string;
  constructor(
    name?: string,
    shopName?: string) {
    this.name = name? name : '';
    this.shopName = shopName? shopName : '';
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
