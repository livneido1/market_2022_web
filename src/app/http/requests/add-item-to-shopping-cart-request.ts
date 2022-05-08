import { Deserializeable } from "../facadeObjects/deserializable";
import { ItemFacade } from "../facadeObjects/item-facade";

export class AddItemToShoppingCartRequest implements Deserializeable{
  itemToInsert: ItemFacade;
  amount: number;
  shopName: string;
  visitorName: string;

  constructor(){
    this.amount=0;
    this.shopName="";
    this.visitorName="";
    this.itemToInsert = new ItemFacade();

  }

  deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(value);
      this.itemToInsert = new ItemFacade().deserialize(value);
      return this;
  }









}
