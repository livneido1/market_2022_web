import { Deserializable } from "./deserializable";
import { ShoppingBasketFacade } from "./shopping-basket-facade";

export class ShoppingCartFacade  implements Deserializable{

  cart: Map<string, ShoppingBasketFacade>; // <ShopName ,basket for the shop>
  price:number;

  constructor(){
      this.cart = new Map();
      this.price =0;
  }

  deserialize(value: any): this {
      if (!value){
        return this;
      }
      Object.assign(this,value);
      this.cart = new Map();
      for (const entry of Object.entries(value.cart) ) {
        const basket = new ShoppingBasketFacade().deserialize(entry[1]);
        const shopName = entry[0];
        this.cart.set(shopName, basket);
      }
      return this;
  }
}
