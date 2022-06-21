import { Deserializable } from "../facadeObjects/deserializable";

export class CloseShopRequest implements Deserializable{

  shopOwnerName: string;
  shopName: string;

  constructor(
    shopOwnerName?: string,
    shopName?: string,){
    this.shopOwnerName = shopOwnerName;
    this.shopName = shopName;
  }

  deserialize(value: any): this {
    if (!value){
     return this;
    }
    Object.assign(this,value);
    return this;
  }





}
