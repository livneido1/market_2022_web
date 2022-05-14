import { Deserializable } from '../facadeObjects/deserializable';

export class NamePasswordRequest implements Deserializable {
  name: string;
  password: string;
  constructor() {
    this.name = '';
    this.password = '';
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
