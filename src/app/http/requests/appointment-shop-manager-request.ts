import { Deserializable } from '../facadeObjects/deserializable';

export class AppointmentShopManagerRequest implements Deserializable {
  private shopOwnerName: string;
  private appointedShopManager: string;
  private shopName: string;

  constructor() {
    this.shopOwnerName = '';
    this.appointedShopManager = '';
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
