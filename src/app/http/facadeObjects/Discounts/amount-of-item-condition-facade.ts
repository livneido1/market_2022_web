import { Deserializable } from '../deserializable';
import { ConditionFacade } from './condition-facade';

export class AmountOfItemConditionFacade
  extends ConditionFacade
  implements Deserializable
{
  amount: number;
  itemID: number;

  constructor(amount?: number, itemID?: number) {
    super("AmountOfItemConditionFacade");
    this.amount = amount ? amount : -1;
    this.itemID = itemID ? itemID : -1;
  }
  deserialize(value: any): this {
    if (!value){
      return this;
    }
    Object.assign(this,value);
    return this;
  }
}
