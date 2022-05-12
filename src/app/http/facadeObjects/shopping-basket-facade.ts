import { Deserializable } from './deserializable';
import { ItemFacade } from './ItemFacade';

export class ShoppingBasketFacade implements Deserializable {
  items: Map<ItemFacade, number>; //<Item,quantity>
  price: number;

  constructor() {
    this.items = new Map();
    this.price = -2;
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.items = new Map();
    for (const entry of value.items.entries()) {
      const item = new ItemFacade().deserialize(entry[0]);
      const amount = entry[1];
      this.items.set(item, amount);
    }
    return this;
  }
}
