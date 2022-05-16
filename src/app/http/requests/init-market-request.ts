import { Deserializable } from '../facadeObjects/deserializable';

export class InitMarketRequest implements Deserializable {
  userName: string;
  password: string;
  constructor() {
    this.userName = '';
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
