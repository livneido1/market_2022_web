import { Deserializable } from '../facadeObjects/deserializable';

export class RemoveMemberRequest implements Deserializable {
  manager: string;
  memberToRemove: string;

  constructor(manager?: string, memberToRemove?: string) {
    this.manager = manager;
    this.memberToRemove = memberToRemove;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
