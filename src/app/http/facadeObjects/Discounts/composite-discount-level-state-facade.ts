import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { DiscountLevelStateFacade } from './discount-level-state-facade';

export class CompositeDiscountLevelStateFacade
  extends DiscountLevelStateFacade
  implements Deserializable
{
  discountLevelStateFacades: DiscountLevelStateFacade[];
  constructor(
    type?: string,
    discountLevelStateFacades?: DiscountLevelStateFacade[]
  ) {
    super(type);
    this.discountLevelStateFacades = discountLevelStateFacades
      ? discountLevelStateFacades
      : [];
  }

  deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this, value);
      this.discountLevelStateFacades = [];
      for (const disc of value.discountLevelStateFacades){
        const deserializer = new ObjectsDeserializer();
        const deserializedDisc = deserializer.getDiscountLevelStateFacade(disc);
        this.discountLevelStateFacades.push(deserializedDisc);
      }
      return this;
  }
}