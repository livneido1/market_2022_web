import { Deserializable } from './deserializable';
import { Response } from './response';
export class ResponseT<T> extends Response {
  public value: any;

  constructor() {
    super();
    this.value = undefined;
  }



  override deserialize(input: any): this {
    if (!input) {
      return this;
    }
    Object.assign(this, input);
    this.value = input.value;
    return this;
  }
}
