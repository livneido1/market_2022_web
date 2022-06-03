import { Deserializable } from '../facadeObjects/deserializable';

export class InitMarketRequest implements Deserializable {
  userName: string;
  password: string;
  constructor(userName?: string, password?: string) {
    this.userName = userName ? userName : '';
    this.password = password ? password : '';
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
