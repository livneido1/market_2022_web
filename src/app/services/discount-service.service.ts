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
@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  createdDiscountList: DiscountTypeFacade[];
  currentDiscount: DiscountTypeFacade;
  currentLevelList: DiscountLevelStateFacade[];
  currentLevel: DiscountLevelStateFacade;
  currentConditionList: ConditionFacade[];
  currentCondition: ConditionFacade;

  constructor() {
    this.createdDiscountList = [];
    this.createdDiscountList = [];
    this.currentDiscount = undefined;
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



  reset() {
    this.createdDiscountList = [];
    this.currentConditionList = [];
  }

  getAllSimpleConditionsFacade(): ConditionFacade[] {
    return [
      new AmountOfItemConditionFacade(),
      new PriceConditionFacade()
    ];
  }

  getAllCompositeConditionFacade(): CompositeConditionFacade[]{
    return [
      new AndCompositeConditionFacade(),
      new OrCompositeConditionFacade()
    ]
  }

  // conditionTypeStrToObj(type: string): ConditionFacade {
  //   switch (type) {
  //     case 'AmountOfItemConditionFacade':
  //       return new AmountOfItemConditionFacade();
  //     case 'PriceConditionFacade':
  //       return new PriceConditionFacade();
  //     case 'OrCompositeConditionFacade':
  //       return new OrCompositeConditionFacade();
  //   }
  //   return undefined;
  // }


    // getLevelTypeFromText(type: string, input: any) {
  //   switch (type) {
  //     case 'ShopLevelStateFacade':
  //       return new ShopLevelStateFacade();
  //     case 'CategoryLevelStateFacade':
  //       return new CategoryLevelStateFacade(input);
  //     case 'ItemLevelStateFacade':
  //       return new ItemLevelStateFacade(input);
  //     case 'CompositeLevelStateTest':
  //       return new CompositeLevelStateTest();
  //   }
  //   return 'unknown type';
  // }
}
