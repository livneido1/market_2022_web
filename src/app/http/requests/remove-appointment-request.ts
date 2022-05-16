import { Deserializable } from '../facadeObjects/deserializable';

export class RemoveAppointmentRequest implements Deserializable {
  boss: string;
  firedAppointed: string;
  shopName: string;
  constructor() {
    this.boss = '';
    this.firedAppointed = '';
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
