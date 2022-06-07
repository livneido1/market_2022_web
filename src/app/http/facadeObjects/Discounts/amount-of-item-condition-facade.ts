import { Deserializable } from '../deserializable';
import { ConditionFacade } from './condition-facade';

export class AmountOfItemConditionFacade
  extends ConditionFacade
  implements Deserializable
{
  amount: number;
  itenID: number;

  constructor(amount?: number, itenID?: number) {
    super("AmountOfItemConditionFacade");
    this.amount = amount ? amount : -1;
    this.itenID = itenID ? itenID : -1;
  }
  deserialize(value: any): this {
    if (!value){
      return this;
    }
    Object.assign(this,value);
    return this;
  }
}
