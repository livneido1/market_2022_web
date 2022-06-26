import { Deserializable } from '../deserializable';
import { Category } from '../ItemFacade';
import { ObjectsDeserializer } from '../objects-deserializer';
import { DiscountLevelStateFacade } from './discount-level-state-facade';
import { DiscountLevelStateWrapper, DiscountLevelStateWrapperType } from './Wrappers/discount-level-state-wrapper';

export class ItemLevelStateFacade
  extends DiscountLevelStateFacade
  implements Deserializable
{
  itemID: number;

  constructor(itemID?: number) {
    super('ItemLevelStateFacade', 'Item Level');
    this.itemID = itemID ? itemID : -1;
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }

  getWrapper(): DiscountLevelStateWrapper {
    return new DiscountLevelStateWrapper(
      DiscountLevelStateWrapperType.ItemLevelStateFacade,
      this.itemID,
      Category.general,
      []
    );
  }

  getString(): string {
      return "Level: Item Discount\nItemId:"+this.itemID;
  }
}
