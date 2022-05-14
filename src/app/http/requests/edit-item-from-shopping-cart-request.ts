import { Deserializable } from "../facadeObjects/deserializable";
import { ItemFacade } from "../facadeObjects/ItemFacade";

export class EditItemFromShoppingCartRequest implements Deserializable {

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
    Object.assign(this,value);
    this.itemFacade=  new ItemFacade().deserialize(value.itemFacade);
    return this;
  }

}
