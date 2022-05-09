import { Deserializable } from "../facadeObjects/deserializable";

export class GetHistoryByMemberRequest implements Deserializable {
  private systemManagerName: string;
  private memberName: string;

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
