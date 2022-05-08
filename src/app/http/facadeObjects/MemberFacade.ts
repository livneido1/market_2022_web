import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { ShopManagerAppointmentFacade } from './ShopManagerAppointmentFacade';
import { ShoppingCartFacade } from './shopping-cart-facade';

export class MemberFacade implements Deserializable {
  private name: string;
  private myCart: ShoppingCartFacade;
  private appointedByMe: AppointmentFacade[];
  private myAppointments: AppointmentFacade[];
  private purchaseHistory: ShoppingCartFacade[];

  constructor() {
    this.name = '';
    this.myCart = new ShoppingCartFacade();
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
      let app = new ShopManagerAppointmentFacade().deserializeAppointment(appointment);
      this.appointedByMe.push(app);
    }
    this.myAppointments = [];
    for (const appointment of value.myAppointments){
      let app = new ShopManagerAppointmentFacade().deserializeAppointment(appointment);
      this.myAppointments.push(app);
    }
    this.purchaseHistory = [];
    for (const appointment of value.purchaseHistory){
      this.purchaseHistory.push(new ShoppingCartFacade().deserialize( appointment));
    }

    return this;
  }
}
