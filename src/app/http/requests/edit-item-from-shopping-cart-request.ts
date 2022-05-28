import { Deserializable } from "../facadeObjects/deserializable";
import { ItemFacade } from "../facadeObjects/ItemFacade";

export class EditItemFromShoppingCartRequest implements Deserializable {

  amount: number;
  itemFacade: ItemFacade;
  shopName: string;
  visitorName: string;

  constructor(amount?: number, itemFacade?: ItemFacade, shopName?:string , visitorName?:string){
    this.amount = amount? amount : 0;
    this.itemFacade = itemFacade? itemFacade: new ItemFacade();
    this.shopName = shopName?shopName : "";
    this.visitorName = visitorName? visitorName : "";

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
