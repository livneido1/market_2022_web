import { Deserializable } from "./deserializable";
import { ShopFacade } from "./shop-facade";
import { ShoppingBasketFacade } from "./shopping-basket-facade";

export class ShoppingCartFacade  implements Deserializable{

  private cart: Map<string, ShoppingBasketFacade>; // <ShopName ,basket for the shop>
  private price:number;

  constructor(){
      this.cart = new Map();
      this.price =-2;
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
