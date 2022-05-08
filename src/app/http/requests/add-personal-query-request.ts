import { Deserializable } from "../facadeObjects/deserializable";

export class AddPersonalQueryRequest implements Deserializable {

  private userAdditionalQueries: string;
  private userAdditionalAnswers: string;
  private member: string;

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
