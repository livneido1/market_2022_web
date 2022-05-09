import { Deserializable } from './deserializable';

export enum Category {
  general,
  fruit,
  meat,
  cellular,
  electricity,
}
export class ItemFacade implements Deserializable {
  info: string;
  ID: number;
  name: string;
  price: number;
  category: Category;
  keywords: string[];
  rank: number;
  rankers: number;

  constructor() {
    this.info = '';
    this.ID = 0;
    this.name = '';
    this.price = 0;
    this.category = Category.general;
    this.keywords = [];
    this.rank = 0;
    this.rankers = 0;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.category = value.category;
    this.keywords = [];
    for (const keyword of value.keywords) {
      this.keywords.push(keyword);
    }
    return this;
  }


}
