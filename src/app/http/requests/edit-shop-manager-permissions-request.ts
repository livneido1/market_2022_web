import { Deserializable } from "../facadeObjects/deserializable";
import { ShopManagerAppointmentFacade } from "../facadeObjects/shop-manager-appointment-facade";

export class EditShopManagerPermissionsRequest implements Deserializable{

  shopOwnerName:string;
  managerName:string;
  relatedShop:string;
  updatedAppointment:ShopManagerAppointmentFacade;

  constructor(
    shopOwnerName?:string,
    managerName?:string,
    relatedShop?:string,
    updatedAppointment?:ShopManagerAppointmentFacade
  ){
    this.shopOwnerName = shopOwnerName? shopOwnerName : "";
    this.managerName = managerName? managerName : "";
    this.relatedShop = relatedShop? relatedShop : "";
    this.updatedAppointment = updatedAppointment? updatedAppointment : new ShopManagerAppointmentFacade();

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
