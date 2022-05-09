import { Deserializable } from './deserializable';
import { ItemFacade } from './ItemFacade';

export class ShoppingBasketFacade implements Deserializable {
  items: Map<ItemFacade, number>; //<Item,quantity>
  price: number;

  constructor(  ) {
    this.items = new Map();
    this.price = -2;
  }
  deserialize(value: any): this {
    return this;
  }
}
