import { Deserializable } from '../facadeObjects/deserializable';

export class TwoStringRequest implements Deserializable {
  name: string;
  shopName: string;
  constructor() {
    this.name = '';
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
