import { Deserializable } from "../facadeObjects/deserializable";
import { ItemFacade } from "../facadeObjects/ShoppingBasketFacade";

export class ChangeShopItemInfoRequest implements Deserializable {

  private shopOwnerName: string;
  private updatedItem: ItemFacade;
  private oldItem: ItemFacade;
  private shopName: string;

  constructor(){
    this.shopOwnerName= "";
    this.updatedItem=  new ItemFacade();
    this.oldItem= new ItemFacade();
    this.shopName= "";
  }


  deserialize(value: any): this {
    if (!value){
     return this;
    }
    Object.assign(this,value);
    this.updatedItem=  new ItemFacade().deserialize(value.updatedItem);
    this.oldItem= new ItemFacade().deserialize(value.oldItem);
    return this;
  }


}
