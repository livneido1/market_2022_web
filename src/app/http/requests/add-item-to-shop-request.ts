import { Deserializable } from '../facadeObjects/deserializable';
import { Category } from '../facadeObjects/ItemFacade';

export class AddItemToShopRequest implements Deserializable {
  private shopOwnerName: string;
  private name: string;
  private price: number;
  private category: Category;
  private info: string;
  private keywords: string[];
  private amount: number;
  private shopName: string;

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
