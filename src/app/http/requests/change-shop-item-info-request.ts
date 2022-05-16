import { Deserializable } from '../facadeObjects/deserializable';
import { ItemFacade } from '../facadeObjects/ItemFacade';

export class ChangeShopItemInfoRequest implements Deserializable {
  private shopOwnerName: string;
  private updatedItem: string; //info
  private oldItem: ItemFacade;
  private shopName: string;

  constructor() {
    this.shopOwnerName = '';
    this.updatedItem = '';
    this.oldItem = new ItemFacade();
    this.shopName = '';
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
