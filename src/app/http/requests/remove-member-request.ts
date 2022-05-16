import { Deserializable } from '../facadeObjects/deserializable';

export class RemoveMemberRequest implements Deserializable {
  manager: string;
  MemberToRemove: string;

  constructor() {
    this.manager = "";
    this.MemberToRemove = "";
  }




  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
