import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { ConditionFacade } from './condition-facade';


export class CompositeConditionFacade
  extends ConditionFacade
  implements Deserializable
{
  conditionFacadeList: ConditionFacade[];

  constructor(type?:string, title?:string,
    conditionFacadeList?: ConditionFacade[]
  ) {
    super(type, title);
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
    this.type = 'CompositeConditionFacade';
    return this;
  }
}
