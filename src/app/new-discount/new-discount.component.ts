import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { Response } from 'app/http/facadeObjects/response';
import { AddDiscountToShopRequest } from 'app/http/requests/add-discount-to-shop-request';
import {
  MergeDiscountData,
  MergeDiscountsDialogComponent,
} from 'app/merge-discounts-dialog/merge-discounts-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { PoliciesService } from 'app/services/policies-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';
import { TreeViewAdapterService, TreeViewItem } from 'app/services/tree-view-adapter.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-new-discount',
  templateUrl: './new-discount.component.html',
  styleUrls: ['./new-discount.component.scss'],
})
export class NewDiscountComponent implements OnInit {
  currentDiscounts: DiscountTypeFacade[];
  selectedDiscount: DiscountTypeFacade;
  selectedNode: TreeViewItem;

  treeControl = new NestedTreeControl<TreeViewItem>((node) => node.children);
  discountDataSource = new MatTreeNestedDataSource<TreeViewItem>();
  constructor(
    private engine: EngineService,
    private messageService: MessageService,
    private modelAdapter: ModelAdapterService,
    private policiesService: PoliciesService,
    private config: ConfigService,
    public dialog: MatDialog,
    private treeAdapter: TreeViewAdapterService
  ) {}

  ngOnInit(): void {
    this.currentDiscounts = this.policiesService.createdDiscountList;
    this.updateDiscountTreeData();
  }

  isDiscountsEmpty() {
    return this.currentDiscounts.length < 1;
  }
  addSubDiscount() {
    this.config.isSubDiscountClicked = true;
  }

  onMergeDiscountsClick() {
    const data: MergeDiscountData = {
      discounts: this.currentDiscounts,
    };
    const dialogRef = this.dialog.open(MergeDiscountsDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result: DiscountTypeFacade[]) => {
      if (result) {
        this.currentDiscounts = result;
        this.updateDiscountTreeData();
      }
    });
  }
  backToShop() {}

  openDiscountDialog(discount: DiscountTypeFacade) {}
  getDiscountName(discount: DiscountTypeFacade) {
    return this.policiesService.getDiscountName(discount);
  }

  removeDiscount(discount: DiscountTypeFacade) {
    const index = this.currentDiscounts.indexOf(discount);
    if (index !== 1){
      this.currentDiscounts.splice(index,1);
    }
  }

  canDelete(){
    return this.selectedNode && this.selectedNode.isParent
  }
  onBackClicked(){
    this.config.isMainDiscountClicked=true;
  }

  submit() {
    if (this.currentDiscounts.length !== 1 ){
      this.messageService.errorMessage("you must have exaclty one discount to submit, merge if exceeded");
      return;
    }
    const discount = this.currentDiscounts[0];
    const discountWrapper = discount.getWrapper();
    const request = new AddDiscountToShopRequest(
      discountWrapper,
      this.config.selectedShop.shopName,
      this.config.visitor.name
    );
    this.engine.addDiscountToShop(request).subscribe(responseJson =>{
      const response = new Response().deserialize(responseJson);
      if (response.isErrorOccurred()){
        this.messageService.errorMessage(response.getMessage());
      }
      else{
        this.messageService.validMessage("successfully added discount to shop");
        this.config.isMainDiscountClicked=true;
      }
    });
  }

  isExactOneDiscout(): boolean {
    return this.currentDiscounts.length === 1;
  }



  /////////////////////////// Tree view Code ////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  getDiscountInfo(){
    if (this.selectedDiscount){
      return this.selectedDiscount.getString();
    }
    return "";
  }
  updateDiscountTreeData() {
    const items: TreeViewItem[] = [];
    for (const discount of this.currentDiscounts) {
      items.push(this.treeAdapter.DiscountToTreeViewItem(discount,true));
    }
    this.discountDataSource.data = items;
  }
  onDiscountSelect(node: TreeViewItem){
    this.selectedDiscount = node.value;
    this.selectedNode = node;
  }



  hasChild(_: number, node: TreeViewItem){
    return (!!node.children && node.children.length > 0);
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
}
