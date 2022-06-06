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
  id: number;
  name: string;
  price: number;
  category: Category;
  keywords: string[];
  rank: number;
  rankers: number;

  constructor() {
    this.info = '';
    this.id = 0;
    this.name = '';
    this.price = 0;
    this.category = Category.general;
    this.keywords = [];
    this.rank = 0;
    this.rankers = 0;
  }

  getCategoryString(): string {
    switch (this.category) {
      case Category.general:
        return 'general';
      case Category.fruit:
        return 'fruit';
      case Category.cellular:
        return 'cellular';
      case Category.meat:
        return 'meat';
      case Category.electricity:
        return 'electricity';
    }
    return this.category;
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
