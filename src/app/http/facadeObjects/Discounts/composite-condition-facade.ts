import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { ConditionFacade } from './condition-facade';

export enum CompositeConditionType {
  or,
  and,
}

export class CompositeConditionFacade
  extends ConditionFacade
  implements Deserializable
{
  compositeConditionType: CompositeConditionType;
  conditionFacadeList: ConditionFacade[];

  constructor(
    compositeConditionType?: CompositeConditionType,
    conditionFacadeList?: ConditionFacade[]
  ) {
    super('CompositeConditionFacade');
    this.compositeConditionType = compositeConditionType
      ? compositeConditionType
      : undefined;
    this.conditionFacadeList = conditionFacadeList ? conditionFacadeList : [];
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    const deserialzer = new ObjectsDeserializer();
    Object.assign(this, value);
    this.conditionFacadeList = [];
    for (const cond of value.conditionFacadeList) {
      const currCond: ConditionFacade = deserialzer.getConditionFacade(cond);
      this.conditionFacadeList.push(currCond);
    }
    this.compositeConditionType = value.compositeConditionType;
    this.type = 'CompositeConditionFacade';
    return this;
  }
}
