import { Deserializable } from "../facadeObjects/deserializable";

export class AddPersonalQueryRequest implements Deserializable {

  userAdditionalQueries: string;
  userAdditionalAnswers: string;
  member: string;

  constructor(){
    this.userAdditionalQueries="";
    this.userAdditionalAnswers = "";
    this.member= ""
  }

  deserialize(value: any): this {
    if (!value){
     return this;
    }
    Object.assign(this,value);
    return this;
  }

}
