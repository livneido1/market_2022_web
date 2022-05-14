import { AppointmentFacade } from "./AppointmentFacade";
import { ShopManagerAppointmentFacade } from "./shop-manager-appointment-facade";
import { ShopOwnerAppointmentFacade } from "./ShopOwnerAppointmentFacade";

export class ObjectsDeserializer {

    constructor(){}

    getAppoitmentFacade(input: any): AppointmentFacade{
      if (!input){     
        return null;
      }
      if (input.type == "ShopOwnerAppointmentFacade" ){
        return new ShopOwnerAppointmentFacade().deserialize(input);
      }
      if (input.type == "ShopManagerAppointmentFacade"  ){
        return new ShopManagerAppointmentFacade().deserialize(input);
      }
      return null;
    }
}
