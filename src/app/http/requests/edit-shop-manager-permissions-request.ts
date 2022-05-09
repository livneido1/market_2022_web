import { Deserializable } from "../facadeObjects/deserializable";
import { ShopManagerAppointmentFacade } from "../facadeObjects/shop-manager-appointment-facade";

export class EditShopManagerPermissionsRequest implements Deserializable{

  private shopOwnerName:string;
  private managerName:string;
  private relatedShop:string;
  private updatedAppointment:ShopManagerAppointmentFacade;

  constructor(){
    this.shopOwnerName = "";
    this.managerName = "";
    this.relatedShop = "";
    this.updatedAppointment = new ShopManagerAppointmentFacade();

  }

  deserialize(value: any): this {
    if (!value){
     return this;
    }
    Object.assign(this,value);
    this.updatedAppointment=  new ShopManagerAppointmentFacade().deserialize(value.updatedAppointment);
    return this;
  }
}
