export class BuyShoppingCartRequest implements Deserializeable{

  private visitorName: string;
  private expectedPrice: number;
  private paymentMethod: PaymentMethod;
  private address;

  constructor(){
    this.visitorName = "";
    this.expectedPrice = -1;
    this.paymentMethod = undefined;
    this.address = undefined;
  }



  deserialize(value: any): this {
    if (!value){
     return this;
    }
    Object.assign(value);
    this.paymentMethod = new PaymentMethod().deserialize(value.paymentMethod);
    this.address = new Address().deserialize(value.address);
    return this;
  }


}
