import { Deserializable } from '../deserializable';
import { ObjectsDeserializer } from '../objects-deserializer';
import { DiscountLevelStateFacade } from './discount-level-state-facade';

export abstract class CompositeDiscountLevelStateFacade
  extends DiscountLevelStateFacade
  implements Deserializable
{
  discountLevelStateFacades: DiscountLevelStateFacade[];
  constructor(
    type?: string,
    title?:string,
    discountLevelStateFacades?: DiscountLevelStateFacade[]
  ) {
    super(type, title);
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
  getString(): string {
      return "Level: Composite Level Discount";
  }
}
