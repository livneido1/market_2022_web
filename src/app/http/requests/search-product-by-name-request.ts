import { Deserializable } from '../facadeObjects/deserializable';

export class SearchProductByNameRequest implements Deserializable {
  productName: string;
  constructor() {
    this.productName = '';
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
