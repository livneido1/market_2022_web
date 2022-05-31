import { Deserializable } from '../facadeObjects/deserializable';

export class AppointmentShopOwnerRequest implements Deserializable {
  shopOwnerName: string;
  appointedShopOwner: string;
  shopName: string;

  constructor(
    shopOwnerName?: string,
    appointedShopOwner?: string,
    shopName?: string
  ) {
    this.shopOwnerName = shopOwnerName ? shopOwnerName : '';
    this.appointedShopOwner = appointedShopOwner ? appointedShopOwner : '';
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
