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
import { CompositePurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/composite-purchase-policy-type-facade';
import { OrCompositePurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/or-composite-purchase-policy-type-facade';
import { AtMostPurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/at-most-purchase-policy-type-facade';
import { AtLeastPurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/at-least-purchase-policy-type-facade';
import { AndCompositePurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/and-composite-purchase-policy-level-state-facade';
import { OrCompositePurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/or-composite-purchase-policy-level-state-facade';
import { XorCompositePurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/xor-composite-purchase-policy-level-state-facade';
import { CategoryPurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/category-purchase-policy-level-state-facade';
import { ItemPurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/item-purchase-policy-level-state-facade';
import { ShopPurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/shop-purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-level-state-facade';
import { CompositePurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/composite-purchase-policy-level-state-facade';
@Injectable({
  providedIn: 'root',
})
export class PoliciesService {
  createdDiscountList: DiscountTypeFacade[];
  currentPolicyList: PurchasePolicyTypeFacade[];

  constructor() {
    this.createdDiscountList = [];
    this.currentPolicyList = [];
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
  getAllCompositePurchasePolicyTypeFacade(): CompositePurchasePolicyTypeFacade[] {
    return [new OrCompositePurchasePolicyTypeFacade()];
  }
  getAllSimplePurchasePolicyTypeFacade(): PurchasePolicyTypeFacade[] {
    return [
      new AtLeastPurchasePolicyTypeFacade(),
      new AtMostPurchasePolicyTypeFacade(),
    ];
  }
  getAllCompositePurchasePolicyLevelStateFacade(): CompositePurchasePolicyLevelStateFacade[] {
    return [
      new AndCompositePurchasePolicyLevelStateFacade(),
      new OrCompositePurchasePolicyLevelStateFacade(),
      new XorCompositePurchasePolicyLevelStateFacade(),
    ];
  }
  getAllSimplePurchasePolicyLevelStateFacade(): PurchasePolicyLevelStateFacade[] {
    return [
      new CategoryPurchasePolicyLevelStateFacade(),
      new ItemPurchasePolicyLevelStateFacade(),
      new ShopPurchasePolicyLevelStateFacade(),
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
      case 'MaxCompositeDiscountTypeFacade':
        return 'Max Discount';
      case 'ConditionalDiscountFacade':
        return 'Conditional Discount';
      case 'SimpleDiscountFacade':
        return 'Regular Discount';
      default:
        return 'unknown type';
    }
  }

  getPurchasePolicyName(purchase: PurchasePolicyTypeFacade) {
    if (!purchase) {
      return '';
    }
    switch (purchase.type) {
      case 'AtMostPurchasePolicyTypeFacade':
        return 'At Most Policy';
      case 'AtLeastPurchasePolicyTypeFacade':
        return 'At least Policy';
      case 'OrCompositePurchasePolicyTypeFacade':
        return 'At least One of Policies';
      default:
        return 'unknown type';
    }
  }

  getPurchasePolicyLevelStateName(purchaseLevelState: PurchasePolicyLevelStateFacade){
    if (!purchaseLevelState){
      return "";
    }
    switch (purchaseLevelState.type){
      case 'ShopPurchasePolicyLevelStateFacade':
        return "All Shop policy";
      case 'CategoryPurchasePolicyLevelStateFacade':
        return "by Category policy State";
      case 'ItemPurchasePolicyLevelStateFacade':
        return "By Item policy";
      case 'XorCompositePurchasePolicyLevelStateFacade':
        return "One of a kind policy";
      case 'OrCompositePurchasePolicyLevelStateFacade':
        return "Atleast One policy";
      case 'AndCompositePurchasePolicyLevelStateFacade':
        return "&& of all policy";
    }
  }

  reset() {
    this.createdDiscountList = [];
    this.currentPolicyList = [];
  }
}
