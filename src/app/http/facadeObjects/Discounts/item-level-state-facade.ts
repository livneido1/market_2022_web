import { Deserializable } from "../deserializable";
import { ObjectsDeserializer } from "../objects-deserializer";
import { DiscountLevelStateFacade } from "./discount-level-state-facade";

export class ItemLevelStateFacade extends DiscountLevelStateFacade implements Deserializable {
  itemID:number;


  constructor(itemID?:number){
    super("ItemLevelStateFacade", "Item Level");
    this.itemID = itemID? itemID : -1;
  }
  deserialize(value: any): this {
    if (!value){
      return this;
    }
    Object.assign(this,value);
    return this;
  }

}
