import { Deserializable } from '../facadeObjects/deserializable';
import { ItemFacade } from '../facadeObjects/ItemFacade';

export class RemoveItemFromShopRequest implements Deserializable {
  shopOwnerName: string;
  item: ItemFacade;
  shopName: string;
  constructor(shopOwnerName?: string, item?: ItemFacade, shopName?: string) {
    this.shopOwnerName = shopOwnerName ? shopOwnerName : '';
    this.item = item ? item : new ItemFacade();
    this.shopName = shopName ? shopName : '';
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.item = new ItemFacade().deserialize(value.item);
    return this;
  }
}
