import { Deserializable } from '../../deserializable';
import { AmountOfItemConditionFacade } from '../amount-of-item-condition-facade';
import { AndCompositeConditionFacade } from '../and-composite-condition-facade';
import { ConditionFacade } from '../condition-facade';
import { OrCompositeConditionFacade } from '../or-composite-condition-facade';
import { PriceConditionFacade } from '../price-condition-facade';

export enum ConditionWrapperType {
  AndCompositeConditionFacade,
  OrCompositeConditionFacade,
  AmountOfItemConditionFacade,
  PriceConditionFacade,
}
export class ConditionWrapper implements Deserializable {
  conditionWrapperType: ConditionWrapperType;
  conditionWrappers: ConditionWrapper[];
  itemID: number;
  amount: number;
  price: number;

  constructor(
    conditionWrapperType?: ConditionWrapperType,
    conditionWrappers?: ConditionWrapper[],
    itemID?: number,
    amount?: number,
    price?: number
  ) {
    this.conditionWrapperType = conditionWrapperType;
    this.conditionWrappers = conditionWrappers;
    this.itemID = itemID;
    this.amount = amount;
    this.price = price;
  }

  deserialize(value: any): this {
    if (value) {
      Object.assign(this, value);
      this.conditionWrapperType = this.getConditionWrapperType(
        value.conditionWrapperType
      );
      this.conditionWrappers = [];
      if (value.conditionWrappers) {
        for (const conditionWrapper of value.conditionWrappers) {
          this.conditionWrappers.push(
            new ConditionWrapper().deserialize(conditionWrapper)
          );
        }
      }
    }

    return this;
  }

  getCondition(): ConditionFacade {
    switch (this.conditionWrapperType) {
      case ConditionWrapperType.AmountOfItemConditionFacade:
        return new AmountOfItemConditionFacade(this.amount, this.itemID);
      case ConditionWrapperType.AndCompositeConditionFacade:
        const subConds1: ConditionFacade[] = this.getSubConditions();
        return new AndCompositeConditionFacade(subConds1);
      case ConditionWrapperType.OrCompositeConditionFacade:
        const subConds: ConditionFacade[] = this.getSubConditions();
        return new OrCompositeConditionFacade(subConds);
      case ConditionWrapperType.PriceConditionFacade:
        return new PriceConditionFacade(this.price);
      default:
        return undefined;
    }
  }

  getConditionWrapperType(input): ConditionWrapperType {
    switch (input) {
      case 'AndCompositeConditionFacade':
        return ConditionWrapperType.AndCompositeConditionFacade;
      case 'OrCompositeConditionFacade':
        return ConditionWrapperType.OrCompositeConditionFacade;
      case 'AmountOfItemConditionFacade':
        return ConditionWrapperType.AmountOfItemConditionFacade;
      case 'PriceConditionFacade':
        return ConditionWrapperType.PriceConditionFacade;
    }
    return undefined;
  }

  private getSubConditions() {
    const subConds: ConditionFacade[] = [];
    for (const wrapper of this.conditionWrappers) {
      subConds.push(wrapper.getCondition());
    }
    return subConds;
  }
}
