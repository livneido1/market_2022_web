import { Deserializable } from "../facadeObjects/deserializable";

export class GetManagerPermissionRequest implements Deserializable {

  shopOwnerName:string ;
  managerName:string ;
  relatedShop:string ;

  constructor(){

  this.shopOwnerName = "" ;
  this.managerName = "" ;
  this.relatedShop = "" ;

  }
  deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this,value);
      return this;
  }
}
