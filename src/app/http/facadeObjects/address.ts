import { Deserializable } from './deserializable';

export class Address implements Deserializable {
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
