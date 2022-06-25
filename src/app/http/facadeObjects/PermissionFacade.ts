import { Deserializable } from './deserializable';

export class PermissionFacade implements Deserializable {
  name: string;

  constructor(name?: string) {
    this.name = name;
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
