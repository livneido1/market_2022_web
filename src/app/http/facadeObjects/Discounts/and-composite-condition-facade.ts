import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { CompositeConditionFacade } from './composite-condition-facade';
import { ConditionFacade } from './condition-facade';
import { ConditionWrapper, ConditionWrapperType } from './Wrappers/condition-wrapper';

export class AndCompositeConditionFacade
  extends CompositeConditionFacade
  implements Deserializable
{
  constructor(conditionFacadeList?: ConditionFacade[]) {
    super('AndCompositeConditionFacade',"All Of Conditions Needed", conditionFacadeList);
  }
  override deserialize(value: any): this {
    if (!value){
      return this;
    }
    Object.assign(this,value);
    this.conditionFacadeList = [];
    for (const cond of value.conditionFacadeList){
      const condObj = new ObjectsDeserializer().getConditionFacade(cond);
      this.conditionFacadeList.push(condObj);
    }
    return this;
  }


  getWrapper(): ConditionWrapper {
    const subWrappers:ConditionWrapper[] = [];
    for (const cond of this.conditionFacadeList){
      subWrappers.push(cond.getWrapper());
    }
    return new ConditionWrapper(
      ConditionWrapperType.AndCompositeConditionFacade,
      subWrappers,
      -1,
      -1,
      -1
    );
  }
}
