import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { ItemFacade } from './ItemFacade';
import { ObjectsDeserializer } from './objects-deserializer';
import { ShopManagerAppointmentFacade } from './shop-manager-appointment-facade';
import { ShopOwnerAppointmentFacade } from './ShopOwnerAppointmentFacade';

export class ShopFacade implements Deserializable {
  shopName: string;
  itemMap: Map<number, ItemFacade>; //<ItemID, actualItem>
  employees: Map<string, AppointmentFacade>; //<name, appointment>
  itemsCurrentAmount: Map<number, number>; // id , amount
  closed: boolean;

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
    //deserialzie items
    this.itemMap = new Map();
    for (const entry of Object.entries(value.itemMap)) {
      const itemId: number = Number(entry[0]);
      this.itemMap.set(itemId, new ItemFacade().deserialize(entry[1]));
    }

    //deserialize employees
    const tempApp: AppointmentFacade = new ShopManagerAppointmentFacade();
    this.employees = new Map();
    const objDeserializer = new ObjectsDeserializer();
    for (const entry of Object.entries(value.employees)) {
      const appointment: AppointmentFacade =
        objDeserializer.getAppoitmentFacade(entry[1]);
      const name = entry[0];
      this.employees.set(name, appointment);
    }
    this.itemsCurrentAmount = new Map();
    for (const entry of Object.entries(value.itemsCurrentAmount)) {
      const id = Number(entry[0]);
      const amount = Number(entry[1]);
      this.itemsCurrentAmount.set(id, amount);
    }
    return this;
  }
}
