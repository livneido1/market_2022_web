import { Injectable } from '@angular/core';
import { CompositeConditionFacade } from 'app/http/facadeObjects/Discounts/composite-condition-facade';
import { CompositeDiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/composite-discount-level-state-facade';
import { CompositeDiscountTypeFacade } from 'app/http/facadeObjects/Discounts/composite-discount-type-facade';
import { ConditionFacade } from 'app/http/facadeObjects/Discounts/condition-facade';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { TreeViewItem } from 'app/sub-discount/sub-discount.component';

@Injectable({
  providedIn: 'root',
})
export class TreeViewAdapterService {
  constructor() {}

  discountLevelToTreeViewItem(level: DiscountLevelStateFacade): TreeViewItem {
    const children: TreeViewItem[] = [];
    const asComposite = level as CompositeDiscountLevelStateFacade;
    if (asComposite.discountLevelStateFacades) {
      for (const child of asComposite.discountLevelStateFacades) {
        const item = this.discountLevelToTreeViewItem(child);
        children.push(item);
      }
    }
    const treeViewItem: TreeViewItem = {
      name: level.title,
      value: level,
      children: children,
    };
    return treeViewItem;
  }
  ConditionToTreeViewItem(condition: ConditionFacade): TreeViewItem {
    const children: TreeViewItem[] = [];
    const asComposite = condition as CompositeConditionFacade;
    if (asComposite.conditionFacadeList) {
      for (const child of asComposite.conditionFacadeList) {
        const item = this.ConditionToTreeViewItem(child);
        children.push(item);
      }
    }
    const treeViewItem: TreeViewItem = {
      name: condition.title,
      value: condition,
      children: children,
    };
    return treeViewItem;
  }
  DiscountToTreeViewItem(discount: DiscountTypeFacade): TreeViewItem {
    const children: TreeViewItem[] = [];
    const asComposite = discount as CompositeDiscountTypeFacade;
    if (asComposite.discountTypes) {
      for (const child of asComposite.discountTypes) {
        const item = this.DiscountToTreeViewItem(child);
        children.push(item);
      }
    }
    const treeViewItem: TreeViewItem = {
      name: discount.title,
      value: discount,
      children: children,
    };
    return treeViewItem;
  }
}
