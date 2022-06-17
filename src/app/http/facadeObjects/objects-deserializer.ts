import { AppointmentFacade } from "./AppointmentFacade";
import { AmountOfItemConditionFacade } from "./Discounts/amount-of-item-condition-facade";
import { AndCompositeConditionFacade } from "./Discounts/and-composite-condition-facade";
import { AndCompositeDiscountLevelStateFacade } from "./Discounts/and-composite-discount-level-state-facade";
import { AndCompositePurchasePolicyLevelStateFacade } from "./Discounts/and-composite-purchase-policy-level-state-facade";
import { AtLeastPurchasePolicyTypeFacade } from "./Discounts/at-least-purchase-policy-type-facade";
import { AtMostPurchasePolicyTypeFacade } from "./Discounts/at-most-purchase-policy-type-facade";
import { CategoryLevelStateFacade } from "./Discounts/category-level-state-facade";
import { CategoryPurchasePolicyLevelStateFacade } from "./Discounts/category-purchase-policy-level-state-facade";
import { CompositeConditionFacade } from "./Discounts/composite-condition-facade";
import { ConditionFacade } from "./Discounts/condition-facade";
import { ConditionalDiscountFacade } from "./Discounts/conditional-discount-facade";
import { DiscountLevelStateFacade } from "./Discounts/discount-level-state-facade";
import { DiscountTypeFacade } from "./Discounts/discount-type-facade";
import { ItemLevelStateFacade } from "./Discounts/item-level-state-facade";
import { ItemPurchasePolicyLevelStateFacade } from "./Discounts/item-purchase-policy-level-state-facade";
import { MaxCompositeDiscountTypeFacade } from "./Discounts/max-composite-discount-type-facade";
import { MaxXorCompositeDiscountLevelStateFacade } from "./Discounts/max-xor-composite-discount-level-state-facade";
import { OrCompositeConditionFacade } from "./Discounts/or-composite-condition-facade";
import { OrCompositePurchasePolicyLevelStateFacade } from "./Discounts/or-composite-purchase-policy-level-state-facade";
import { OrCompositePurchasePolicyTypeFacade } from "./Discounts/or-composite-purchase-policy-type-facade";
import { PriceConditionFacade } from "./Discounts/price-condition-facade";
import { PurchasePolicyLevelStateFacade } from "./Discounts/purchase-policy-level-state-facade";
import { PurchasePolicyTypeFacade } from "./Discounts/purchase-policy-type-facade";
import { ShopLevelStateFacade } from "./Discounts/shop-level-state-facade";
import { ShopPurchasePolicyLevelStateFacade } from "./Discounts/shop-purchase-policy-level-state-facade";
import { SimpleDiscountFacade } from "./Discounts/simple-discount-facade";
import { XorCompositePurchasePolicyLevelStateFacade } from "./Discounts/xor-composite-purchase-policy-level-state-facade";
import { ShopManagerAppointmentFacade } from "./shop-manager-appointment-facade";
import { ShopOwnerAppointmentFacade } from "./ShopOwnerAppointmentFacade";

export class ObjectsDeserializer {

    constructor(){}

    getAppoitmentFacade(input: any): AppointmentFacade{
      if (!input){
        return null;
      }
      if (input.type === "ShopOwnerAppointmentFacade" ){
        return new ShopOwnerAppointmentFacade().deserialize(input);
      }
      if (input.type === "ShopManagerAppointmentFacade"  ){
        return new ShopManagerAppointmentFacade().deserialize(input);
      }
      return null;
    }

    getConditionFacade(input: any): ConditionFacade{
      if (!input){
        return null;
      }
      if (input.type === "AmountOfItemConditionFacade" ){
        return new AmountOfItemConditionFacade().deserialize(input);
      }
      if (input.type === "AndCompositeConditionFacade"  ){
        return new AndCompositeConditionFacade().deserialize(input);
      }
      if (input.type === "OrCompositeConditionFacade"  ){
        return new OrCompositeConditionFacade().deserialize(input);
      }
      if (input.type === "PriceConditionFacade"  ){
        return new PriceConditionFacade().deserialize(input);
      }
      return null;
    }


    getDiscountLevelStateFacade(input:any): DiscountLevelStateFacade{
      if (!input){
        return undefined;
      }
      if (input.type === "CategoryLevelStateFacade" ){
        return new CategoryLevelStateFacade().deserialize(input);
      }
      if (input.type === "ItemLevelStateFacade"  ){
        return new ItemLevelStateFacade().deserialize(input);
      }
      if (input.type === "ShopLevelStateFacade"  ){
        return new ShopLevelStateFacade().deserialize(input);
      } 
      if (input.type === "AndCompositeDiscountLevelStateFacade"  ){
        return new AndCompositeDiscountLevelStateFacade().deserialize(input);
      } 
      if (input.type === "MaxXorCompositeDiscountLevelStateFacade"  ){
        return new MaxXorCompositeDiscountLevelStateFacade().deserialize(input);
      } 
      return null;
    }


    getDiscountType(input:any): DiscountTypeFacade{
      if (!input){
        return undefined;
      }
      if (input.type === "MaxCompositeDiscountTypeFacade" ){
        return new MaxCompositeDiscountTypeFacade().deserialize(input);
      }
      if (input.type === "ConditionalDiscountFacade"  ){
        return new ConditionalDiscountFacade().deserialize(input);
      }
      if (input.type === "SimpleDiscountFacade"  ){
        return new SimpleDiscountFacade().deserialize(input);
      }
      return undefined;
    }

    // TODO implement here
    getPurchasePolicyTypeFacade(input:any): PurchasePolicyTypeFacade{
      if (!input){
        return undefined;
      }
      switch (input.type){
        case "AtLeastPurchasePolicyTypeFacade":
          return new AtLeastPurchasePolicyTypeFacade();
        case "AtMostPurchasePolicyTypeFacade":
          return new AtMostPurchasePolicyTypeFacade();
        case "OrCompositePurchasePolicyTypeFacade":
          return new OrCompositePurchasePolicyTypeFacade();

      }
      return undefined;
    }

     // TODO implement here
     getPurchasePolicyLevelStateFacade(input:any): PurchasePolicyLevelStateFacade{
      if (!input){
        return undefined;
      }
      switch (input.type){
        case "ItemPurchasePolicyLevelStateFacade":
          return new ItemPurchasePolicyLevelStateFacade();
        case "AndCompositePurchasePolicyLevelStateFacade":
          return new AndCompositePurchasePolicyLevelStateFacade();
        case "CategoryPurchasePolicyLevelStateFacade":
          return new CategoryPurchasePolicyLevelStateFacade();
        case "OrCompositePurchasePolicyLevelStateFacade":
          return new OrCompositePurchasePolicyLevelStateFacade();
        case "ShopPurchasePolicyLevelStateFacade":
          return new ShopPurchasePolicyLevelStateFacade();
        case "XorCompositePurchasePolicyLevelStateFacade":
          return new XorCompositePurchasePolicyLevelStateFacade();
        

      }
      return undefined;
    }

}
