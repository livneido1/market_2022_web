import { Deserializable } from '../facadeObjects/deserializable';

export class AppointmentShopManagerRequest implements Deserializable {
  shopOwnerName: string;
  appointedShopManager: string;
  shopName: string;

  constructor(
    shopOwnerName?: string,
    appointedShopManager?: string,
    shopName?: string
  ) {
    this.shopOwnerName = shopOwnerName ? shopOwnerName : '';
    this.appointedShopManager = appointedShopManager
      ? appointedShopManager
      : '';
    this.shopName = shopName ? shopName : '';
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
