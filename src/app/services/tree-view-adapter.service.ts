import { Injectable } from '@angular/core';
import { CompositeConditionFacade } from 'app/http/facadeObjects/Discounts/composite-condition-facade';
import { CompositeDiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/composite-discount-level-state-facade';
import { CompositeDiscountTypeFacade } from 'app/http/facadeObjects/Discounts/composite-discount-type-facade';
import { CompositePurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/composite-purchase-policy-level-state-facade';
import { CompositePurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/composite-purchase-policy-type-facade';
import { ConditionFacade } from 'app/http/facadeObjects/Discounts/condition-facade';
import { ConditionalDiscountFacade } from 'app/http/facadeObjects/Discounts/conditional-discount-facade';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { PurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-level-state-facade';
import { PurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-type-facade';

export interface TreeViewItem {
  name: string;
  value: any;
  children: TreeViewItem[];
  isParent: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TreeViewAdapterService {
  constructor() {}

  discountLevelToTreeViewItem(
    level: DiscountLevelStateFacade,
    isParent: boolean
  ): TreeViewItem {
    const children: TreeViewItem[] = [];
    const asComposite = level as CompositeDiscountLevelStateFacade;
    if (asComposite.discountLevelStateFacades) {
      for (const child of asComposite.discountLevelStateFacades) {
        const item = this.discountLevelToTreeViewItem(child, false);
        children.push(item);
      }
    }
    const treeViewItem: TreeViewItem = {
      name: level.title,
      value: level,
      children: children,
      isParent: isParent,
    };
    return treeViewItem;
  }
  ConditionToTreeViewItem(
    condition: ConditionFacade,
    isParent: boolean
  ): TreeViewItem {
    const children: TreeViewItem[] = [];
    const asComposite = condition as CompositeConditionFacade;
    if (asComposite.conditionFacadeList) {
      for (const child of asComposite.conditionFacadeList) {
        const item = this.ConditionToTreeViewItem(child, false);
        children.push(item);
      }
    }
    const treeViewItem: TreeViewItem = {
      name: condition.title,
      value: condition,
      children: children,
      isParent: isParent,
    };
    return treeViewItem;
  }
  DiscountToTreeViewItem(
    discount: DiscountTypeFacade,
    isParent: boolean
  ): TreeViewItem {
    const children: TreeViewItem[] = [];
    // levelinsert
    const levelTreeItem = this.discountLevelToTreeViewItem(
      discount.discountLevelState,
      false
    );
    children.push(levelTreeItem);
    //condition insert
    const asConditional = discount as ConditionalDiscountFacade;
    if (asConditional.conditionFacade) {
      children.push(
        this.ConditionToTreeViewItem(asConditional.conditionFacade, false)
      );
    }
    const asComposite = discount as CompositeDiscountTypeFacade;
    if (asComposite.discountTypes) {
      for (const child of asComposite.discountTypes) {
        const item = this.DiscountToTreeViewItem(child, false);
        children.push(item);
      }
    }
    const treeViewItem: TreeViewItem = {
      name: discount.title,
      value: discount,
      children: children,
      isParent: isParent,
    };
    return treeViewItem;
  }

  /////////////////// POLICIES ////////////////

  policyLevelToTreeViewItem(
    level: PurchasePolicyLevelStateFacade,
    isParent: boolean
  ): TreeViewItem {
    const children: TreeViewItem[] = [];
    const asComposite = level as CompositePurchasePolicyLevelStateFacade;
    if (asComposite.purchasePolicyLevelStateFacades) {
      for (const child of asComposite.purchasePolicyLevelStateFacades) {
        const item = this.policyLevelToTreeViewItem(child, false);
        children.push(item);
      }
    }
    const treeViewItem: TreeViewItem = {
      name: level.title,
      value: level,
      children: children,
      isParent: isParent,
    };
    return treeViewItem;
  }


  PolicyToTreeItem(
    policy: PurchasePolicyTypeFacade,
    isParent: boolean
  ): TreeViewItem {
    const children: TreeViewItem[] = [];
    // level insert
    const levelTreeItem = this.policyLevelToTreeViewItem(
      policy.purchasePolicyLevelStateFacade,
      false
    );
    children.push(levelTreeItem);

    const asComposite = policy as CompositePurchasePolicyTypeFacade;
    if (asComposite.purchasePolicyTypeFacades) {
      for (const child of asComposite.purchasePolicyTypeFacades) {
        const item = this.PolicyToTreeItem(child, false);
        children.push(item);
      }
    }
    const treeViewItem: TreeViewItem = {
      name: policy.title,
      value: policy,
      children: children,
      isParent: isParent,
    };
    return treeViewItem;
  }
}
