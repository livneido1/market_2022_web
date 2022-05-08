import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { ItemFacade } from './ItemFacade';
import { ShopOwnerAppointmentFacade } from './ShopOwnerAppointmentFacade';

export class ShopFacade implements Deserializable {
  private shopName: string;
  private itemMap: Map<number, ItemFacade>; //<ItemID,main.businessLayer.Item>
  private employees: Map<String, AppointmentFacade>; //<name, appointment>
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
    for (const entry of value.employees.entries()) {
      let appointment: AppointmentFacade= new ShopOwnerAppointmentFacade();
      switch (entry[1].type) {
        case 'ShopOwnerAppointment':
          appointment = new ShopOwnerAppointmentFacade().deserialize(value);
          break;
        case 'ShopOwnerAppointment':
          appointment = new ShopOwnerAppointmentFacade().deserialize(value);
          break;
      }
      this.employees.set(entry[0],appointment);
    }
    this.itemsCurrentAmount = new Map();
    for (const entry of value.itemsCurrentAmount.entries()) {
      this.itemsCurrentAmount.set(new ItemFacade().deserialize(entry[0]), entry[1]);
    }
    return this;
  }
}
