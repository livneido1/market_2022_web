import { Deserializeable } from "../facadeObjects/deserializable";

export class AddPersonalQueryRequest implements Deserializeable {

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
    Object.assign(value);
    return this;
  }

}
