import { Deserializable } from "../facadeObjects/deserializable";

export class CloseShopRequest implements Deserializable{

  private shopOwnerName: string;
  private shopName: string;

  constructor(){
    this.shopOwnerName = "";
    this.shopName = "";
  }

  deserialize(value: any): this {
    if (!value){
     return this;
    }
    Object.assign(this,value);
    return this;
  }





}
