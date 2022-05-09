import { Deserializable } from "../facadeObjects/deserializable";

export class GetAllSystemPurchaseHistoryRequest implements Deserializable{
  private systemManagerName:string ;

  constructor(){
    this.systemManagerName = "";
  }

deserialize(value: any): this {
    if (!value){
      return this;
    }
    Object.assign(this,value);
    return this;
}
}
