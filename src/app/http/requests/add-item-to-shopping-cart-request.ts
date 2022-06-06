import { Deserializable } from "../facadeObjects/deserializable";
import { ItemFacade } from "../facadeObjects/ItemFacade";

export class AddItemToShoppingCartRequest implements Deserializable{
  itemToInsert: ItemFacade;
  amount: number;
  visitorName: string;

  constructor(){
    this.amount=0;
    this.visitorName="";
    this.itemToInsert = new ItemFacade();

  }

  deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this,value);
      this.itemToInsert = new ItemFacade().deserialize(value.itemToInsert);
      return this;
  }









}
