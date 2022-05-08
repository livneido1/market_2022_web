import { NONE_TYPE } from "@angular/compiler";
import { MemberFacade } from "./MemberFacade";
import { PermissionFacade } from "./PermissionFacade";
import { ShopFacade } from "./shop-facade";
import { ShopManagerAppointmentFacade } from "./ShopManagerAppointmentFacade";
import { ShopOwnerAppointmentFacade } from "./ShopOwnerAppointmentFacade";

export abstract class AppointmentFacade{
    protected appointed : MemberFacade;       //  the actual appointed member
    protected superVisor : MemberFacade;      //  member appointedMe
    protected relatedShop : ShopFacade;
    protected permissions : PermissionFacade[];
    protected type: string ;
    constructor(){
        this.appointed = new MemberFacade();
        this.superVisor = new MemberFacade();
        this.relatedShop = new ShopFacade();
        this.permissions = [];
        this.type = "";

    }

    deserializeAppointment(value:any): AppointmentFacade{
      switch (value.type){
        case "ShopOwnerAppointment":
          return new ShopOwnerAppointmentFacade().deserialize(value);
        case "ShopManagerAppointment":
            return new ShopManagerAppointmentFacade().deserialize(value);
      }
      return this;
    }


    deserialize(value: any): this {
        return this;
    }
}
