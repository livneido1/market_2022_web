import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AddPurchaseLevelDialogComponent } from 'app/add-purchase-level-dialog/add-purchase-level-dialog.component';
import { AtLeastPurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/at-least-purchase-policy-type-facade';
import { AtMostPurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/at-most-purchase-policy-type-facade';
import { PurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-level-state-facade';
import { PurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-type-facade';
import {
  MergePurchaseLevelData,
  MergePurchaseLevelDialigComponent,
} from 'app/merge-purchase-level-dialig/merge-purchase-level-dialig.component';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { PoliciesService } from 'app/services/policies-service.service';
import { TreeViewAdapterService, TreeViewItem } from 'app/services/tree-view-adapter.service';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-sub-purchase-policy',
  templateUrl: './sub-purchase-policy.component.html',
  styleUrls: ['./sub-purchase-policy.component.scss'],
})
export class SubPurchasePolicyComponent implements OnInit {
  currentLevels: PurchasePolicyLevelStateFacade[];
  currentType: PurchasePolicyTypeFacade;
  typeList: PurchasePolicyTypeFacade[];
  amount: number;

  selectedNode: TreeViewItem
  selectedPolicy: PurchasePolicyLevelStateFacade
  treeControl = new NestedTreeControl<TreeViewItem>((node) => node.children);
  policyDataSource = new MatTreeNestedDataSource<TreeViewItem>();
  constructor(
    public dialog: MatDialog,
    private config: ConfigService,
    private messageService: MessageService,
    private policiesService: PoliciesService,
    private engine: EngineService,
    private treeAdapter: TreeViewAdapterService
  ) {}

  ngOnInit(): void {
    this.currentLevels = [];
    this.amount = 0;
    this.typeList = this.policiesService.getAllSimplePurchasePolicyTypeFacade();
  }

  addLevel() {
    const dialogRef = this.dialog.open(AddPurchaseLevelDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.currentLevels.push(result);
        this.updatePolicyTreeData();
      }
    });
  }

  onMergeLevels() {
    const data: MergePurchaseLevelData = { levels: this.currentLevels };
    const dialogRef = this.dialog.open(MergePurchaseLevelDialigComponent, {
      width: '500px',
      data: data,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: PurchasePolicyLevelStateFacade[]) => {
        if (result) {
          this.currentLevels = result;
          this.updatePolicyTreeData();
        }
      });
  }
  getLevelName(level: PurchasePolicyLevelStateFacade) {
    return this.policiesService.getPurchasePolicyLevelStateName(level);
  }

  getTypeName(type: PurchasePolicyTypeFacade) {
    return this.policiesService.getPurchasePolicyName(type);
  }

  isAmountError() {
    const isError = !this.amount || this.amount < 1;
    return isError;
  }
  canSubmit() {
    return this.exactOneLevel() && !this.isAmountError();
  }

  onBackClicked(){
    this.config.isAddNewPurchasePolicyClicked=true;
  }

  selectType(type: PurchasePolicyTypeFacade) {
    this.currentType = type;
  }

  removeLevel(level: PurchasePolicyLevelStateFacade) {
    const index = this.currentLevels.indexOf(level);
    if (index > -1) {
      this.currentLevels.splice(index, 1);
      this.updatePolicyTreeData();
    }
  }

  onSubmitClick() {
    if (!this.exactOneLevel()) {
      this.messageService.errorMessage(
        'cannot submit with more or less then 1 level, merge or create new level'
      );
      return;
    }

    const purchasePolicy: PurchasePolicyTypeFacade = this.createPolicyType();
    this.policiesService.currentPolicyList.push(purchasePolicy);
    this.config.isAddNewPurchasePolicyClicked = true;
  }

  canMergeLevels() {
    return this.currentLevels && this.currentLevels.length > 0;
  }
  private createPolicyType() {
    const levelState: PurchasePolicyLevelStateFacade = this.currentLevels[0];
    this.currentType.purchasePolicyLevelStateFacade = levelState;
    switch (this.currentType.type) {
      case 'AtLeastPurchasePolicyTypeFacade':
        (this.currentType as AtLeastPurchasePolicyTypeFacade).amount =
          this.amount;
        break;
      case 'AtMostPurchasePolicyTypeFacade':
        (this.currentType as AtMostPurchasePolicyTypeFacade).amount =
          this.amount;
        break;
    }
    return this.currentType;
  }

  public exactOneLevel() {
    return this.currentLevels.length === 1;
  }

  isTypeChoosed(): boolean {
    return this.currentType !== undefined;
  }


  canDelete(){
    return this.selectedNode && this.selectedNode.isParent;
  }


  /////////////////////////// Tree view Code ////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  getPolicyInfo(){
    if (this.selectedPolicy){
      return this.selectedPolicy.getString();
    }
    return "";
  }
  updatePolicyTreeData() {
    const items: TreeViewItem[] = [];
    for (const policy of this.currentLevels) {
      items.push(this.treeAdapter.policyLevelToTreeViewItem(policy,true));
    }
    this.policyDataSource.data = items;
  }
  onPolicySelect(node: TreeViewItem){
    this.selectedPolicy = node.value;
    this.selectedNode = node;
  }



  hasChild(_: number, node: TreeViewItem){
    return (!!node.children && node.children.length > 0);
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////


}
