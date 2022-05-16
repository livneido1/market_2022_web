import { Deserializable } from './deserializable';
import { ItemFacade } from './ItemFacade';

export class ShoppingBasketFacade implements Deserializable {
  items: Map<number, number>; //<Item,quantity>
  itemMap: Map<number, ItemFacade>
  price: number;

  constructor() {
    this.items = new Map();
    this.itemMap = new Map();
    this.price = -2;
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.items = new Map();
    for (const entry of Object.entries( value.items)) {
      const id = Number(entry[0]);
      const quantity = Number(entry[1]);
      this.items.set(id,quantity);
    }
    this.itemMap = new Map();
    for (const entry of Object.entries( value.itemMap)) {
      const id = Number(entry[0]);
      const item = new ItemFacade().deserialize(entry[1]);
      this.itemMap.set(id,item);
    }
    return this;
  }
}
