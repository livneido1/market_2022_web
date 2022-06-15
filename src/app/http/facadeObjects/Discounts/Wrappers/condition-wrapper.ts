import { Deserializable } from '../../deserializable';

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
      this.conditionWrappers = [];
      for (const conditionWrapper of value.conditionWrappers) {
        this.conditionWrappers.push(
          new ConditionWrapper().deserialize(conditionWrapper)
        );
      }
    }

    return this;
  }
}
