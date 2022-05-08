import { Deserializeable } from "../facadeObjects/deserializable";

export class CloseShopRequest implements Deserializeable{

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
    Object.assign(value);
    return this;
  }





}
