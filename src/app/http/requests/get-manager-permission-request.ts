import { Deserializable } from "../facadeObjects/deserializable";

export class GetManagerPermissionRequest implements Deserializable {

  private shopOwnerName:string ;
  private managerName:string ;
  private relatedShop:string ;

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
