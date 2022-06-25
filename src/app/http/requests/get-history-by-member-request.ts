import { Deserializable } from "../facadeObjects/deserializable";

export class GetHistoryByMemberRequest implements Deserializable {
  systemManagerName: string;
  memberName: string;

  constructor(
    systemManagerName?: string,
    memberName?: string
  ) {
    this.systemManagerName = systemManagerName;
    this.memberName = memberName;
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
