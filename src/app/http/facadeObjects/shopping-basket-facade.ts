import { BidFacade } from './bid-facade';
import { Deserializable } from './deserializable';
import { ItemFacade } from './ItemFacade';

export class ShoppingBasketFacade implements Deserializable {
  items: Map<number, number>; //<Item,quantity>
  itemMap: Map<number, ItemFacade>
  price: number;
  bids: Map<number, BidFacade>

  constructor(
    items?: Map<number, number>,
    itemMap?: Map<number, ItemFacade>,
    price?: number,
    bids?: Map<number, BidFacade>) {
      this.items= items;
      this.itemMap= itemMap;
      this.price= price;
      this.bids= bids;
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
    this.bids = new Map();
    for (const entry of Object.entries( value.bids)) {
      const id = Number(entry[0]);
      const bid = new BidFacade().deserialize(entry[1]);
      this.bids.set(id,bid);
    }
    return this;
  }
}
