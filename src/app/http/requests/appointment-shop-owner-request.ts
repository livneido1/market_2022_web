import { Deserializeable } from "../facadeObjects/deserializable";

export class AppointmentShopOwnerRequest implements Deserializeable{

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
    Object.assign(value);
    return this;
  }

}
