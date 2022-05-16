import { Deserializable } from "../facadeObjects/deserializable";
import { ItemFacade } from "../facadeObjects/ItemFacade";

export class SetItemCurrentAmountRequest implements Deserializable{

  shopOwnerName:string;
  item:ItemFacade;
  amount: number;
  shopName:string;
  constructor(){
    this.shopOwnerName = "";
    this.item = new ItemFacade();
    this.amount = -1;
    this.shopName="";

  }


  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.item =  new ItemFacade().deserialize(value.item);
    return this;
  }
}
