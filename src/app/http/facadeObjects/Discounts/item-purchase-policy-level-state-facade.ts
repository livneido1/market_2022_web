import { Deserializable } from '../deserializable';
import { PurchasePolicyLevelStateFacade } from './purchase-policy-level-state-facade';

export class ItemPurchasePolicyLevelStateFacade
  extends PurchasePolicyLevelStateFacade
  implements Deserializable {
    itemID : number;
    constructor(itemID?:number){
      super("ItemPurchasePolicyLevelStateFacade");
      this.itemID = itemID;
    }


    deserialize(value: any): this {
        if (!value){
          return this;
        }
        Object.assign(this,value);
        return this;
    }
  }
