import { Deserializable } from '../facadeObjects/deserializable';

export class RemoveAppointmentRequest implements Deserializable {
  boss: string;
  firedAppointed: string;
  shopName: string;
  constructor(
    boss?: string,
    firedAppointed?: string,
    shopName?: string
  ) {
    this.boss = boss ? boss :'';
    this.firedAppointed = firedAppointed ? firedAppointed :'';
    this.shopName = shopName ? shopName :'';
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
