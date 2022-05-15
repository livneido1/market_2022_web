import { Deserializable } from "../facadeObjects/deserializable";

export class ValidateSecurityRequest implements Deserializable{
  userName: string;
  answers: string[];
  visitorName: string;
  constructor(){
    this.userName = "";
    this.answers = [];
    this.visitorName = "";
  }


  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.answers = [];
    for (const answer of value.answer){
      this.answers.push(answer);
    }
    return this;
  }

}
