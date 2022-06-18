import { Injectable } from '@angular/core';
import { CategoryLevelStateFacade } from 'app/http/facadeObjects/Discounts/category-level-state-facade';
import { ConditionFacade } from 'app/http/facadeObjects/Discounts/condition-facade';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { ItemLevelStateFacade } from 'app/http/facadeObjects/Discounts/item-level-state-facade';
import { ShopLevelStateFacade } from 'app/http/facadeObjects/Discounts/shop-level-state-facade';
import { AmountOfItemConditionFacade } from 'app/http/facadeObjects/Discounts/amount-of-item-condition-facade';
import { PriceConditionFacade } from 'app/http/facadeObjects/Discounts/price-condition-facade';
import { MaxXorCompositeDiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/max-xor-composite-discount-level-state-facade';
import { AndCompositeDiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/and-composite-discount-level-state-facade';
import { CompositeDiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/composite-discount-level-state-facade';
import { CompositeConditionFacade } from 'app/http/facadeObjects/Discounts/composite-condition-facade';
import { OrCompositeConditionFacade } from 'app/http/facadeObjects/Discounts/or-composite-condition-facade';
import { AndCompositeConditionFacade } from 'app/http/facadeObjects/Discounts/and-composite-condition-facade';
import { CompositeDiscountTypeFacade } from 'app/http/facadeObjects/Discounts/composite-discount-type-facade';
import { MaxCompositeDiscountTypeFacade } from 'app/http/facadeObjects/Discounts/max-composite-discount-type-facade';
import { PurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-type-facade';
@Injectable({
  providedIn: 'root',
})
export class PoliciesService {
  createdDiscountList: DiscountTypeFacade[];
  currentLevelList: DiscountLevelStateFacade[];
  currentLevel: DiscountLevelStateFacade;
  currentConditionList: ConditionFacade[];
  currentCondition: ConditionFacade;

  constructor() {
    this.createdDiscountList = [];
    this.createdDiscountList = [];
    this.currentLevelList = [];
    this.currentLevel = undefined;
    this.currentConditionList = [];
    this.currentCondition = undefined;
  }

  getAllLevelTypes(): string[] {
    return [
      'ShopLevelStateFacade',
      'CategoryLevelStateFacade',
      'ItemLevelStateFacade',
      'CompositeLevelStateTest',
    ];
  }
  getAllSimpleLevelTypes(): DiscountLevelStateFacade[] {
    return [
      new ShopLevelStateFacade(),
      new CategoryLevelStateFacade(),
      new ItemLevelStateFacade(),
    ];
  }
  getAllDiscountCompositeLevelTypes(): CompositeDiscountLevelStateFacade[] {
    return [
      new AndCompositeDiscountLevelStateFacade(),
      new MaxXorCompositeDiscountLevelStateFacade(),
    ];
  }

  getAllSimpleConditionsFacade(): ConditionFacade[] {
    return [new AmountOfItemConditionFacade(), new PriceConditionFacade()];
  }

  getAllCompositeConditionFacade(): CompositeConditionFacade[] {
    return [
      new AndCompositeConditionFacade(),
      new OrCompositeConditionFacade(),
    ];
  }
  getAllCompositeDiscountTypes(): CompositeDiscountTypeFacade[] {
    return [new MaxCompositeDiscountTypeFacade()];
  }

  getDiscountName(discount: DiscountTypeFacade): string {
    if (!discount) {
      return '';
    }
    switch (discount.type) {
        case "MaxCompositeDiscountTypeFacade":
          return "Max Discount";
        case "ConditionalDiscountFacade":
          return "Conditional Discount";
        case "SimpleDiscountFacade":
          return "Regular Discount";
        default:
          return "unknown type";
    }
  }

  getPurchasePolicyName(purchase: PurchasePolicyTypeFacade){
    if (!purchase) {
      return '';
    }
    switch (purchase.type) {
        case "AtMostPurchasePolicyTypeFacade":
          return "At Most Policy";
        case "AtLeastPurchasePolicyTypeFacade":
          return "At least Policy";
        case "OrCompositePurchasePolicyTypeFacade":
          return "At least One of Policies";
        default:
          return "unknown type";
    }
  }

  reset() {
    this.createdDiscountList = [];
    this.currentConditionList = [];
  }

}
