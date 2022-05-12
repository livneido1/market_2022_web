import { Deserializable } from "../facadeObjects/deserializable";
import { ItemFacade } from "../facadeObjects/ItemFacade";

export class editItemRequest implements Deserializable{
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
    Object.assign(this,value);
    this.newItem=  new ItemFacade().deserialize(value.newItem);
    return this;
  }


}
