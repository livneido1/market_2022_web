import { Deserializable } from "../facadeObjects/deserializable";

export class ExitSystemRequest implements Deserializable {
  visitorName:string ;

  constructor(){
    this.visitorName = "";
  }

  deserialize(value: any): this {
    if (!value){
      return this;
     }
     Object.assign(this,value);
     return this;
  }

}
