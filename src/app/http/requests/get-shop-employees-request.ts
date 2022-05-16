import { Deserializable } from '../facadeObjects/deserializable';

export class GetShopEmployeesRequest implements Deserializable {
  shopManagerName: string;
  shopName: string;
  constructor() {
    this.shopManagerName = '';
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
