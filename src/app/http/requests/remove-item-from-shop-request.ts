import { Deserializable } from "../facadeObjects/deserializable";
import { ItemFacade } from "../facadeObjects/ItemFacade";

export class RemoveItemFromShopRequest implements Deserializable{
  shopOwnerName: string;
  item: ItemFacade;
  shopName: string;
  constructor(){
    this.shopOwnerName = "";
    this.item = new ItemFacade();
    this.shopName = "";

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
