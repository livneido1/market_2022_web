import { Deserializable } from './deserializable';

export class PermissionFacade implements Deserializable {
  name: string;

  constructor() {
    this.name = '';
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
