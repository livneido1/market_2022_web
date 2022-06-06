import { Deserializable } from '../facadeObjects/deserializable';
import { ItemFacade } from '../facadeObjects/ItemFacade';

export class ChangeShopItemInfoRequest implements Deserializable {
  shopOwnerName: string;
  updatedItem: string; //info
  oldItem: ItemFacade;
  shopName: string;

  constructor(
    shopOwnerName: string,
    updatedItem: string,
    oldItem: ItemFacade,
    shopName: string
  ) {
    this.shopOwnerName = shopOwnerName ? shopOwnerName : '';
    this.updatedItem = updatedItem ? updatedItem : '';
    this.oldItem = oldItem ? oldItem : new ItemFacade();
    this.shopName = shopName ? shopName : '';
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.updatedItem = value.updatedItem;
    this.oldItem = new ItemFacade().deserialize(value.oldItem);
    return this;
  }
}
