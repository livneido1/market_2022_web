import { Deserializable } from '../facadeObjects/deserializable';

export class GetShopEmployeesRequest implements Deserializable {
  private shopManagerName: string;
  private shopName: string;
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
