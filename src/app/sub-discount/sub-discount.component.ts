import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddConditionDialogComponent } from 'app/add-condition-dialog/add-condition-dialog.component';
import { AddLevelDialogComponent } from 'app/add-level-dialog/add-level-dialog.component';
import { ConditionFacade } from 'app/http/facadeObjects/Discounts/condition-facade';
import { ConditionalDiscountFacade } from 'app/http/facadeObjects/Discounts/conditional-discount-facade';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { SimpleDiscountFacade } from 'app/http/facadeObjects/Discounts/simple-discount-facade';
import { Response } from 'app/http/facadeObjects/response';
import { AddDiscountToShopRequest } from 'app/http/requests/add-discount-to-shop-request';
import {
  MergeConditionComponent,
  MergeConditionData,
} from 'app/merge-condition/merge-condition.component';
import {
  MergeLevelData,
  MergeLevelDialogComponent,
} from 'app/merge-level-dialog/merge-level-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { PoliciesService } from 'app/services/policies-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { CompositeDiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/composite-discount-level-state-facade';
import {
  TreeViewAdapterService,
  TreeViewItem,
} from 'app/services/tree-view-adapter.service';

@Component({
  selector: 'app-sub-discount',
  templateUrl: './sub-discount.component.html',
  styleUrls: ['./sub-discount.component.scss'],
})
export class SubDiscountComponent implements OnInit {
  currentLevels: DiscountLevelStateFacade[];
  currentConditions: ConditionFacade[];
  currentPercentage: number;
  selectedLevel: DiscountLevelStateFacade;
  selectedLevelNode: TreeViewItem;
  selectedCondition: ConditionFacade;
  selectedConditionNode: TreeViewItem;

  treeControl = new NestedTreeControl<TreeViewItem>((node) => node.children);
  levelDataSource = new MatTreeNestedDataSource<TreeViewItem>();
  conditionDataSource = new MatTreeNestedDataSource<TreeViewItem>();
  constructor(
    public dialog: MatDialog,
    private config: ConfigService,
    private messageService: MessageService,
    private discountService: PoliciesService,
    private engine: EngineService,
    private treeAdapter: TreeViewAdapterService
  ) {}

  ngOnInit(): void {
    this.currentLevels = [];
    this.currentConditions = [];
    this.currentPercentage = 0;
  }

  onAddConditionClick() {
    const dialogRef = this.dialog.open(AddConditionDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.currentConditions.push(result);
        this.updateConditionTreeData();
      }
    });
  }

  addLevel() {
    const dialogRef = this.dialog.open(AddLevelDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.currentLevels.push(result);
        this.updateLevelTreeData();
      }
    });
  }

  onMergeConditions() {
    const data: MergeConditionData = {
      existingConditions: this.currentConditions,
    };
    const dialogRef = this.dialog.open(MergeConditionComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result: ConditionFacade[]) => {
      if (result) {
        this.currentConditions = result;
        this.updateConditionTreeData();
      }
    });
  }
  onMergeLevels() {
    const data: MergeLevelData = { discountLevels: this.currentLevels };
    const dialogRef = this.dialog.open(MergeLevelDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result: DiscountLevelStateFacade[]) => {
      if (result) {
        this.currentLevels = result;
        this.updateLevelTreeData();
      }
    });
  }
  getLevelName(level: DiscountLevelStateFacade) {
    return level.title;
  }

  isPercantageError() {
    const isError = !this.currentPercentage || this.currentPercentage < 1;
    return isError;
  }
  canSubmit() {
    return (
      this.exactOneLevel() &&
      this.atMostOneCondition() &&
      !this.isPercantageError()
    );
  }

  removeCondition(condition: ConditionFacade) {
    const index = this.currentConditions.indexOf(condition);
    if (index > -1) {
      this.currentConditions.splice(index, 1);
    }
  }

  removeLevel(level: DiscountLevelStateFacade) {
    const index = this.currentLevels.indexOf(level);
    if (index > -1) {
      this.currentLevels.splice(index, 1);
    }
  }

  onSubmitClick() {
    if (!this.exactOneLevel()) {
      this.messageService.errorMessage(
        'cannot submit with more or less then 1 level facade, merge or create new level'
      );
      return;
    }
    if (!this.atMostOneCondition) {
      this.messageService.errorMessage(
        'cannot submit with more then one condition, please merge the conditions'
      );
      return;
    }

    const discount: DiscountTypeFacade = this.createDiscountType();
    this.discountService.createdDiscountList.push(discount);
    this.config.isAddNewDiscountClicked = true;
  }

  canMergeConditions() {
    return this.currentConditions && this.currentConditions.length > 0;
  }
  canMergeLevels() {
    return this.currentLevels && this.currentLevels.length > 0;
  }
  private createDiscountType() {
    let discount: DiscountTypeFacade;
    const levelState: DiscountLevelStateFacade = this.currentLevels[0];
    // conditional discount
    if (this.currentConditions.length > 0) {
      const condition: ConditionFacade = this.currentConditions[0];
      discount = new ConditionalDiscountFacade(
        this.currentPercentage,
        levelState,
        condition
      );
    }
    // simple discount
    else {
      discount = new SimpleDiscountFacade(this.currentPercentage, levelState);
    }
    return discount;
  }

  public exactOneLevel() {
    return this.currentLevels.length === 1;
  }

  public atMostOneCondition() {
    return this.currentConditions.length <= 1;
  }

  backToShop() {
    this.config.isAddNewDiscountClicked = true;
  }

  //////////////////////////////// TreeView Methds ////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  getLevelInfo() {
    if (this.selectedLevel) {
      return this.selectedLevel.getString();
    }
    return '';
  }
  updateLevelTreeData() {
    const items: TreeViewItem[] = [];
    for (const lvl of this.currentLevels) {
      items.push(this.treeAdapter.discountLevelToTreeViewItem(lvl, true));
    }
    this.levelDataSource.data = items;
  }
  onLevelSelect(node: TreeViewItem) {
    this.selectedLevel = node.value;
    this.selectedLevelNode = node;
  }

  getConditionInfo() {
    if (this.selectedCondition) {
      return this.selectedCondition.getString();
    }
    return '';
  }
  updateConditionTreeData() {
    const items: TreeViewItem[] = [];
    for (const cond of this.currentConditions) {
      items.push(this.treeAdapter.ConditionToTreeViewItem(cond, true));
    }
    this.conditionDataSource.data = items;
  }
  onConditionSelect(node: TreeViewItem) {
    this.selectedCondition = node.value;
    this.selectedConditionNode = node;
  }

  hasChild(_: number, node: TreeViewItem) {
    return !!node.children && node.children.length > 0;
  }
}
