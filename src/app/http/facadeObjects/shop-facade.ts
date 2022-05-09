import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { ItemFacade } from './ItemFacade';
import { ShopManagerAppointmentFacade } from './shop-manager-appointment-facade';
import { ShopOwnerAppointmentFacade } from './ShopOwnerAppointmentFacade';

export class ShopFacade implements Deserializable {
  private shopName: string;
  private itemMap: Map<number, ItemFacade>; //<ItemID,main.businessLayer.Item>
  private employees: Map<String,AppointmentFacade>; //<name, appointment>
  private itemsCurrentAmount: Map<ItemFacade, number>;
  private closed: boolean;

  constructor() {
    this.shopName = '';
    this.itemMap = new Map();
    this.employees = new Map();
    this.itemsCurrentAmount = new Map();
    this.closed = false;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.itemMap = new Map();
    for (const entry of value.itemMap.entries()) {
      this.itemMap.set(entry[0], new ItemFacade().deserialize(entry[1]));
    }
    this.employees = new Map();
    for (const entry of Object.entries(value.employees)) {
      const appointmentJson = entry[1] as AppointmentFacade;
      switch (appointmentJson.type) {
        case 'ShopOwnerAppointment':
            let appointment = new ShopOwnerAppointmentFacade().deserialize(appointmentJson);
            appointment.relatedShop = this;
            this.employees.set(entry[0], appointment);
          break;
        case 'ShopManagerAppointmentFacade':
          let appointment1 = new ShopManagerAppointmentFacade().deserialize(appointmentJson);
          this.employees.set(entry[0],appointment1);
          break;
      }
    }
    this.itemsCurrentAmount = new Map();
    for (const entry of value.itemsCurrentAmount.entries()) {
      this.itemsCurrentAmount.set(new ItemFacade().deserialize(entry[0]), entry[1]);
    }
    return this;
  }
}
