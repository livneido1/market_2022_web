import { Deserializable } from '../facadeObjects/deserializable';
import { Category } from '../facadeObjects/ItemFacade';

export class AddItemToShopRequest implements Deserializable {
  shopOwnerName: string;
  name: string;
  price: number;
  category: Category;
  info: string;
  keywords: string[];
  amount: number;
  shopName: string;

  constructor() {
    this.shopOwnerName = '';
    this.name = '';
    this.price = 0;
    this.category = Category.general;
    this.info = '';
    this.keywords = [];
    this.amount = 0;
    this.shopName = '';
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this,value);
    this.category = value.category;
    this.keywords = [];
    for (const keyword of value.keywords) {
      this.keywords.push(keyword);
    }
    return this;
  }
}
