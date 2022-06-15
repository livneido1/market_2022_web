import { Deserializable } from "../deserializable";
import { CompositeConditionFacade } from "./composite-condition-facade";
import { ConditionFacade } from "./condition-facade";

export class OrCompositeConditionFacade extends CompositeConditionFacade implements Deserializable {
  constructor(conditionFacadeList?:ConditionFacade[]){
    super("OrCompositeConditionFacade", "One Of Conditions",conditionFacadeList);

  }
}
