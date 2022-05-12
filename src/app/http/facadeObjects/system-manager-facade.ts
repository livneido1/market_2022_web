import { Deserializable } from "./deserializable";
import { MemberFacade } from "./MemberFacade";

export class SystemManagerFacade implements Deserializable{
  member: MemberFacade;

  constructor(){
    this.member = new MemberFacade();
  }

  deserialize(value: any): this {
    if (!value){
      return this;
    }
    this.member = new MemberFacade().deserialize(value.member);
    return this;
  }
}
