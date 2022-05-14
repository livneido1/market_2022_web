import { Deserializable } from './deserializable';

export class Response implements Deserializable {
  private errorMessage: string;
  constructor() {
    this.errorMessage = '';
  }
  isErrorOccurred(): boolean {
    const b =  this.errorMessage && this.errorMessage !== '';
    return b;
  }
  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }

  getMessage() {
    return this.errorMessage;
  }
}
