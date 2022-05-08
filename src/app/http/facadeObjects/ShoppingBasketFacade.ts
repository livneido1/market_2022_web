import { Deserializable } from './deserializable';

export class ItemFacade implements Deserializable {
  private items: Map<ItemFacade, number>;
  private price: number;
  constructor() {
    this.items = new Map([]);
    this.price = 0;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.items= new Map();
    for (const entry of value.items.entries()) {
      const item  = new ItemFacade().deserialize(entry[0]);
      this.items.set(item, entry[1]);
    }
    return this;
  }
}
