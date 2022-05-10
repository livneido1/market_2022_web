import { Deserializable } from './deserializable';

export class Response implements Deserializable {
  private errorMessage: string;
  constructor() {
    this.errorMessage = '';
  }
  isErrorOccurred(){
    return !this.errorMessage && this.errorMessage !== '';
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
