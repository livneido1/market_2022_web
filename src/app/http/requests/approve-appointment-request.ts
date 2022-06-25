import { Deserializable } from '../facadeObjects/deserializable';

export class ApproveAppointmentRequest implements Deserializable {
  shopName: string;
  appointedName: string;
  ownerName: string;
  constructor(shopName?: string, appointedName?: string, ownerName?: string) {
    this.shopName = shopName;
    this.appointedName = appointedName;
    this.ownerName = ownerName;
  }

  deserialize(value: any): this {
      if (value){
        Object.assign(this, value);
      }
      return this;
  }
}
