import { Deserializable } from './deserializable';

export class Address implements Deserializable {
  name: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  constructor(
    name?: string,
    address?: string,
    city?: string,
    country?: string,
    zip?: string
  ) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    this.zip = zip;
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
