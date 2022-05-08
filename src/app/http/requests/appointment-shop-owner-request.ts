import { Deserializable } from "../facadeObjects/deserializable";

export class AppointmentShopOwnerRequest implements Deserializable{

  private shopOwnerName: string;
  private appointedShopOwner: string;
  private shopName: string;

  constructor(){
     this.shopOwnerName = "";
     this.appointedShopOwner = "";
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
