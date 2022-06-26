import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-type-facade';
import { Response } from 'app/http/facadeObjects/response';
import { AddPurchasePolicyToShopRequest } from 'app/http/requests/add-purchase-policy-to-shop-request';
import { MergePoliciesData, MergePurchasePoliciesComponent } from 'app/merge-purchase-policies/merge-purchase-policies.component';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';
import { PoliciesService } from 'app/services/policies-service.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { TreeViewAdapterService, TreeViewItem } from 'app/services/tree-view-adapter.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-add-new-purchase-policy',
  templateUrl: './add-new-purchase-policy.component.html',
  styleUrls: ['./add-new-purchase-policy.component.scss']
})
export class AddNewPurchasePolicyComponent implements OnInit {
  currentPolicies: PurchasePolicyTypeFacade[];


  selectedNode: TreeViewItem
  selectedPolicy: PurchasePolicyTypeFacade
  treeControl = new NestedTreeControl<TreeViewItem>((node) => node.children);
  policyDataSource = new MatTreeNestedDataSource<TreeViewItem>();
  constructor(
    private engine: EngineService,
    private messageService: MessageService,
    private modelAdapter: ModelAdapterService,
    private policiesService: PoliciesService,
    private config: ConfigService,
    public dialog: MatDialog,
    private treeAdapter: TreeViewAdapterService
  ) { }

  ngOnInit(): void {
    this.currentPolicies = this.policiesService.currentPolicyList;
    this.updatePolicyTreeData();
  }

  isPoliciesEmpty() {
    return this.currentPolicies.length < 1;
  }
  addSubPolicy() {
    this.config.isSubPurchasePolicyClicked = true;
  }

  onMergePoliciesClick() {
    const data: MergePoliciesData = {
      policies: this.currentPolicies,
    };
    const dialogRef = this.dialog.open(MergePurchasePoliciesComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result: PurchasePolicyTypeFacade[]) => {
      if (result) {
        this.currentPolicies = result;
        this.updatePolicyTreeData();
      }
    });
  }

  // TODO implement here
  backToShop() {}

  openPurchaseDialog(purchase: PurchasePolicyTypeFacade) {}
  getPurchasePolicyName(policy: PurchasePolicyTypeFacade) {
    return this.policiesService.getPurchasePolicyName(policy);
  }

  removePurchase(policy: PurchasePolicyTypeFacade) {
    const index = this.currentPolicies.indexOf(policy);
    if (index !== 1){
      this.currentPolicies.splice(index,1);
      this.updatePolicyTreeData();
    }
  }

  submit() {
    if (this.currentPolicies.length !== 1 ){
      this.messageService.errorMessage("you must have exaclty one policy to submit, merge if exceeded");
      return;
    }
    const policy = this.currentPolicies[0];
    const policyWrapper = policy.getWrapper();
    const request = new AddPurchasePolicyToShopRequest(
      policyWrapper,
      this.config.selectedShop.shopName,
      this.config.visitor.name
    );
    this.engine.addPurchasePolicyToShop(request).subscribe(responseJson =>{
      const response = new Response().deserialize(responseJson);
      if (response.isErrorOccurred()){
        this.messageService.errorMessage(response.getMessage());
      }
      else{
        this.messageService.validMessage("successfully added purchase policy to shop");
        this.config.isMainPurcahsePolicyClicked=true;
      }
    });
  }

  isExactOnePolicy(): boolean {
    return this.currentPolicies.length === 1;
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
    for (const policy of this.currentPolicies) {
      items.push(this.treeAdapter.PolicyToTreeItem(policy,true));
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
