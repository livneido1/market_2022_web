import { Deserializable } from './deserializable';
import { MemberFacade } from './MemberFacade';
import { ShoppingCartFacade } from './shopping-cart-facade';

export class VisitorFacade implements Deserializable {
  name: string;
  member: MemberFacade;
  cart: ShoppingCartFacade;
  constructor() {
    this.name = '';
    this.member = new MemberFacade();
    this.cart = new ShoppingCartFacade();
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.member = new MemberFacade().deserialize(value.member);
    this.cart = new ShoppingCartFacade().deserialize(value.cart);
    return this;
  }
}
