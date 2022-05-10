import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { ShopManagerAppointmentFacade } from './shop-manager-appointment-facade';
import { ShopOwnerAppointmentFacade } from './ShopOwnerAppointmentFacade';
import { ShoppingCartFacade } from './shopping-cart-facade';

export class MemberFacade implements Deserializable {
  name: string;
  myCart: ShoppingCartFacade;
  appointedByMe: AppointmentFacade[];
  myAppointments: AppointmentFacade[];
  purchaseHistory: ShoppingCartFacade[];

  constructor() {
    this.name = '';
    this.myCart = Object();
    this.appointedByMe = [];
    this.myAppointments = [];
    this.purchaseHistory = [];
  }
  deserialize(value: any): this {
    if (!value){
      return this;
    }
    Object.assign(this,value);
    this.myCart = new ShoppingCartFacade().deserialize(value);
    this.appointedByMe = [];
    for (const appointment of value.appointedByMe){
      switch (appointment.type){
        case "ShopManagerAppointmentFacade":
          let app2 =new ShopManagerAppointmentFacade().deserialize(appointment);
          this.appointedByMe.push(app2);
          break;
        case "ShopOwnerAppointmentFacade":
          let app = new ShopOwnerAppointmentFacade().deserialize(appointment);
          this.appointedByMe.push(app);
          break;
      }
      // let app = new ShopManagerAppointmentFacade().deserializeAppointment(appointment);
      // this.appointedByMe.push(app);
    }
    this.myAppointments = [];
    for (const appointment of value.myAppointments){
      // let app = new ShopManagerAppointmentFacade().deserializeAppointment(appointment);
      // this.myAppointments.push(app);
    }
    this.purchaseHistory = [];
    for (const appointment of value.purchaseHistory){
      this.purchaseHistory.push(new ShoppingCartFacade().deserialize( appointment));
    }

    return this;
  }


}
