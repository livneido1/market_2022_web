import { Deserializeable } from "../facadeObjects/deserializable";
import { ItemFacade } from "../facadeObjects/ShoppingBasketFacade";

export class EditItemRequest implements Deserializeable{
  private  newItem: ItemFacade;
  private id: string ;

  constructor(){
    this.newItem = new ItemFacade();
    this.id= "" ;
  }


  deserialize(value: any): this {
    if (!value){
     return this;
    }
    Object.assign(value);
    this.newItem=  new ItemFacade().deserialize(value.newItem);
    return this;
  }


}
