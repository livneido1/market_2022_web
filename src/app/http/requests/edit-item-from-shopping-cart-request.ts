import { Deserializeable } from "../facadeObjects/deserializable";
import { ItemFacade } from "../facadeObjects/ShoppingBasketFacade";

export class EditItemFromShoppingCartRequest implements Deserializeable {

  private amount: number;
  private itemFacade: ItemFacade;
  private shopName: string;
  private visitorName: string;

  constructor(){
    this.amount = 0;
    this.itemFacade = new ItemFacade();
    this.shopName = "";
    this.visitorName = "";

  }


  deserialize(value: any): this {
    if (!value){
     return this;
    }
    Object.assign(value);
    this.itemFacade=  new ItemFacade().deserialize(value.itemFacade);
    return this;
  }

}
