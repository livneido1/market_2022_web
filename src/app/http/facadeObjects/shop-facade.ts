import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { ItemFacade } from './ItemFacade';
import { ObjectsDeserializer } from './objects-deserializer';
import { ShopManagerAppointmentFacade } from './shop-manager-appointment-facade';
import { ShopOwnerAppointmentFacade } from './ShopOwnerAppointmentFacade';

export class ShopFacade implements Deserializable {
  private shopName: string;
  private itemMap: Map<number, ItemFacade>; //<ItemID, actualItem>
  private employees: Map<string, AppointmentFacade>; //<name, appointment>
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
    //deserialzie items
    this.itemMap = new Map();
    for (const entry of Object.entries(value.itemMap)) {
      const itemId:number  = Number(entry[0]);
      this.itemMap.set( itemId, new ItemFacade().deserialize(entry[1]));
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
      const item = new ItemFacade().deserialize(entry[0]);
      let amount: number;
      Object.assign(amount, entry[1]);
      this.itemsCurrentAmount.set(item, amount);
    }
    return this;
  }
}
