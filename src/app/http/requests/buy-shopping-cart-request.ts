import { Address } from "../facadeObjects/address";
import { CreditCard } from "../facadeObjects/credit-card";
import { Deserializable } from "../facadeObjects/deserializable";
import { PaymentMethod } from "../facadeObjects/payment-method";

export class BuyShoppingCartRequest implements Deserializable{

  visitorName: string;
  expectedPrice: number;
  paymentMethod: PaymentMethod;
  address: Address;

  constructor(){
    this.visitorName = "";
    this.expectedPrice = -1;
    this.paymentMethod = new CreditCard();
    this.address = new Address();
  }



  deserialize(value: any): this {
    if (!value){
     return this;
    }
    Object.assign(this,value);
    this.paymentMethod = new CreditCard().deserialize(value.paymentMethod);
    this.address = new Address().deserialize(value.address);
    return this;
  }


}
