import { Injectable } from '@angular/core';
import { CategoryLevelStateFacade } from 'app/http/facadeObjects/Discounts/category-level-state-facade';
import { CompositeLevelStateTest } from 'app/http/facadeObjects/Discounts/composite-level-state-test';
import { ConditionFacade } from 'app/http/facadeObjects/Discounts/condition-facade';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { ItemLevelStateFacade } from 'app/http/facadeObjects/Discounts/item-level-state-facade';
import { ShopLevelStateFacade } from 'app/http/facadeObjects/Discounts/shop-level-state-facade';
import { AmountOfItemConditionFacade } from 'app/http/facadeObjects/Discounts/amount-of-item-condition-facade'
import { PriceConditionFacade } from 'app/http/facadeObjects/Discounts/price-condition-facade';
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
  getAllLevelTypesWithNoComposite():string[]{
    return [
      'ShopLevelStateFacade',
      'CategoryLevelStateFacade',
      'ItemLevelStateFacade',
    ];
  }

  getLevelTypeFromText(type: string, input: any){
    switch (type) {
      case 'ShopLevelStateFacade':
        return new ShopLevelStateFacade();
      case 'CategoryLevelStateFacade':
        return new CategoryLevelStateFacade(input);
      case 'ItemLevelStateFacade':
        return new ItemLevelStateFacade(input);
        case 'CompositeLevelStateTest':
          return new CompositeLevelStateTest();
    }
    return "unknown type";
  }

  getLevelTextFromType(type: string): string {
    switch (type) {
      case 'ShopLevelStateFacade':
        return 'Shop Level';
      case 'CategoryLevelStateFacade':
        return 'Category Level';
      case 'ItemLevelStateFacade':
        return 'Item Level';
        case 'CompositeLevelStateTest':
        return 'Composite State';
    }
    return "unknown type";
  }
  getDiscountLevelName(level: DiscountLevelStateFacade){
    return this.getLevelTextFromType(level.type);
  }
  reset() {
    this.createdDiscountList = [];
    this.currentConditionList = [];
  }

  getAllConditionsTypes(): string[]{
    return [

    ]
  }

  conditionTypeStrToObj(type:string): ConditionFacade {
    switch(type){
      case "AmountOfItemConditionFacade":
        return new AmountOfItemConditionFacade();
      case "PriceConditionFacade":
        return new PriceConditionFacade();
      case "OrCompositeConditionFacade":
        return new OrCompositeConditionFacade();

    }
    return undefined;
  }
}
