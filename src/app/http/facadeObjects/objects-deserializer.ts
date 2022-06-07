import { AppointmentFacade } from "./AppointmentFacade";
import { AmountOfItemConditionFacade } from "./Discounts/amount-of-item-condition-facade";
import { CategoryLevelStateFacade } from "./Discounts/category-level-state-facade";
import { CompositeConditionFacade } from "./Discounts/composite-condition-facade";
import { CompositeDiscountFacade } from "./Discounts/composite-discount-facade";
import { ConditionFacade } from "./Discounts/condition-facade";
import { ConditionalDiscountFacade } from "./Discounts/conditional-discount-facade";
import { DiscountLevelStateFacade } from "./Discounts/discount-level-state-facade";
import { DiscountTypeFacade } from "./Discounts/discount-type-facade";
import { ItemLevelStateFacade } from "./Discounts/item-level-state-facade";
import { PriceConditionFacade } from "./Discounts/price-condition-facade";
import { ShopLevelStateFacade } from "./Discounts/shop-level-state-facade";
import { SimpleDiscountFacade } from "./Discounts/simple-discount-facade";
import { ShopManagerAppointmentFacade } from "./shop-manager-appointment-facade";
import { ShopOwnerAppointmentFacade } from "./ShopOwnerAppointmentFacade";

export class ObjectsDeserializer {

    constructor(){}

    getAppoitmentFacade(input: any): AppointmentFacade{
      if (!input){
        return null;
      }
      if (input.type == "ShopOwnerAppointmentFacade" ){
        return new ShopOwnerAppointmentFacade().deserialize(input);
      }
      if (input.type == "ShopManagerAppointmentFacade"  ){
        return new ShopManagerAppointmentFacade().deserialize(input);
      }
      return null;
    }

    getConditionFacade(input: any): ConditionFacade{
      if (!input){
        return null;
      }
      if (input.type == "AmountOfItemConditionFacade" ){
        return new AmountOfItemConditionFacade().deserialize(input);
      }
      if (input.type == "CompositeConditionFacade"  ){
        return new CompositeConditionFacade().deserialize(input);
      }
      if (input.type == "PriceConditionFacade"  ){
        return new PriceConditionFacade().deserialize(input);
      }
      return null;
    }


    getDiscountLevelStateFacade(input:any): DiscountLevelStateFacade{
      if (!input){
        return undefined;
      }
      if (input.type == "CategoryLevelStateFacade" ){
        return new CategoryLevelStateFacade().deserialize(input);
      }
      if (input.type == "ItemLevelStateFacade"  ){
        return new ItemLevelStateFacade().deserialize(input);
      }
      if (input.type == "ShopLevelStateFacade"  ){
        return new ShopLevelStateFacade().deserialize(input);
      }
      return null;
    }


    getDiscountType(input:any): DiscountTypeFacade{
      if (!input){
        return undefined;
      }
      if (input.type == "CompositeDiscountFacade" ){
        return new CompositeDiscountFacade().deserialize(input);
      }
      if (input.type == "ConditionalDiscountFacade"  ){
        return new ConditionalDiscountFacade().deserialize(input);
      }
      if (input.type == "SimpleDiscountFacade"  ){
        return new SimpleDiscountFacade().deserialize(input);
      }
      return undefined;
    }

    getC(input:any): DiscountTypeFacade{
      if (!input){
        return undefined;
      }
      if (input.type == "CompositeDiscountFacade" ){
        return new CompositeDiscountFacade().deserialize(input);
      }
      if (input.type == "ConditionalDiscountFacade"  ){
        return new ConditionalDiscountFacade().deserialize(input);
      }
      if (input.type == "SimpleDiscountFacade"  ){
        return new SimpleDiscountFacade().deserialize(input);
      }
      return undefined;
    }
}
