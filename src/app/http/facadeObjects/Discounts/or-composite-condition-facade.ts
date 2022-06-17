import { Deserializable } from "../deserializable";
import { CompositeConditionFacade } from "./composite-condition-facade";
import { ConditionFacade } from "./condition-facade";
import { ConditionWrapper, ConditionWrapperType } from "./Wrappers/condition-wrapper";

export class OrCompositeConditionFacade extends CompositeConditionFacade implements Deserializable {
  constructor(conditionFacadeList?:ConditionFacade[]){
    super("OrCompositeConditionFacade", "One Of Conditions",conditionFacadeList);

  }

  
  getWrapper(): ConditionWrapper {
    const subWrappers:ConditionWrapper[] = [];
    for (const cond of this.conditionFacadeList){
      subWrappers.push(cond.getWrapper());
    }
    return new ConditionWrapper(
      ConditionWrapperType.OrCompositeConditionFacade,
      subWrappers,
      -1,
      -1,
      -1
    );
  }
}
