import { Deserializable } from './deserializable';
import { FacadeObject } from './facade-object';

export class Address implements Deserializable, FacadeObject<Address> {
  city: string;
  street: string;
  buildingNum: string;
  constructor() {
    this.city = '';
    this.street = '';
    this.buildingNum = '';
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }

  getObj(): Address {
      return new Address();
  }


}
