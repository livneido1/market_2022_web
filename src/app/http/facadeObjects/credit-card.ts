import { Deserializable } from './deserializable';
import { PaymentMethod } from './payment-method';

export class CreditCard implements Deserializable, PaymentMethod {
  number: string;
  month: string;
  year: string;
  cvv: string;
  holder: string;
  id: string;

  constructor(
    number?: string,
    month?: string,
    year?: string,
    cvv?: string,
    holder?: string,
    id?: string
  ) {
    this.number = number;
    this.month = month;
    this.year = year;
    this.cvv = cvv;
    this.holder = holder;
    this.id = id;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
