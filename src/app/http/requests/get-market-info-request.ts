import { Deserializable } from "../facadeObjects/deserializable";

export class GetMarketInfoRequest implements Deserializable{
  sysManager :string
  constructor(sysManager?:string){
    this.sysManager = sysManager;

  }


  deserialize(value: any): this {
    if (!value){
      return this;
    }
    Object.assign(this,value);
    return this;
}
}
