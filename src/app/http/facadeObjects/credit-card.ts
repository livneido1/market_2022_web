import { Deserializable } from "./deserializable";
import { PaymentMethod } from "./payment-method";

export class CreditCard implements Deserializable,PaymentMethod {
  private cardNumber: string;
  private expiredDate: string;
  private threeDigits: string;

  constructor(){
    this.cardNumber = "";
    this.threeDigits = "";
    this.expiredDate = "";

  }

  deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this,value);
      return this;
  }
}
