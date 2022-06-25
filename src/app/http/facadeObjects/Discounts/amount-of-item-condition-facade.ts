import { Deserializable } from '../deserializable';
import { ConditionFacade } from './condition-facade';
import {
  ConditionWrapper,
  ConditionWrapperType,
} from './Wrappers/condition-wrapper';

export class AmountOfItemConditionFacade
  extends ConditionFacade
  implements Deserializable
{
  amount: number;
  itemID: number;

  constructor(amount?: number, itemID?: number) {
    super('AmountOfItemConditionFacade', 'Amount of Item Condition');
    this.amount = amount ? amount : -1;
    this.itemID = itemID ? itemID : -1;
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }

  getWrapper(): ConditionWrapper {
    return new ConditionWrapper(
      ConditionWrapperType.AmountOfItemConditionFacade,
      [],
      this.itemID,
      this.amount,
      -1
    );
  }

  getString(): string {
    return (
      'Minumun Amount of Item Needed' +
      '\n' +
      'itemID : ' +
      this.itemID +
      '\n' +
      'amount needed : ' +
      this.amount +
      '\n'
    );
  }
}
