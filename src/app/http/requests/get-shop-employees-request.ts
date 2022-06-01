import { Deserializable } from '../facadeObjects/deserializable';

export class GetShopEmployeesRequest implements Deserializable {
  shopManagerName: string;
  shopName: string;
  constructor(
    shopManagerName?: string,
    shopName?: string) {
    this.shopManagerName = shopManagerName?  shopManagerName :  '';
    this.shopName = shopName?  shopName :  '';
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
