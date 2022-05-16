import { Deserializable } from "../facadeObjects/deserializable";

export class GetHistoryByMemberRequest implements Deserializable {
  systemManagerName: string;
  memberName: string;

  constructor() {
    this.systemManagerName = '';
    this.memberName = '';
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
