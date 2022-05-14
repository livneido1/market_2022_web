import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { ObjectsDeserializer } from './objects-deserializer';
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
    this.myCart = new ShoppingCartFacade().deserialize(value.myCart);
    const objDeserializer =  new ObjectsDeserializer();
    this.myAppointments = [];
    for (const app of value.myAppointments){
      this.myAppointments.push(objDeserializer.getAppoitmentFacade(app));
    }
    this.appointedByMe = [];
    for (const app of value.appointedByMe){
      this.appointedByMe.push(objDeserializer.getAppoitmentFacade(app));
    }
    this.purchaseHistory = []
    for (const history of value.purchaseHistory){
      const historyCart = new ShoppingCartFacade().deserialize(history);
      this.purchaseHistory.push(historyCart);
    }
    return this;
  }


}
