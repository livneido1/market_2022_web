import { Deserializable } from "./deserializable";
import { ShopFacade } from "./shop-facade";

export class ShoppingCartFacade  implements Deserializable{

  private cart: Map<ShopFacade, ShoppingCartFacade>; // <Shop ,basket for the shop>
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
      // for (const entry of value.cart.entries()) {
      for (const entry of Object.entries(value.cart)) {
        const shop:ShopFacade  = new ShopFacade().deserialize(entry[0]);
        const cart:ShoppingCartFacade  = new ShoppingCartFacade().deserialize(entry[1]);
        this.cart.set(shop, cart);
      }
      return this;
  }
}
