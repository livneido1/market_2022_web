import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryPurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/category-purchase-policy-level-state-facade';
import { ItemPurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/item-purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-level-state-facade';
import { ShopPurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/shop-purchase-policy-level-state-facade';
import { DialogData } from 'app/item-mat-dialog/item-mat-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';
import { PoliciesService } from 'app/services/policies-service.service';

@Component({
  selector: 'app-add-purchase-level-dialog',
  templateUrl: './add-purchase-level-dialog.component.html',
  styleUrls: ['./add-purchase-level-dialog.component.scss']
})
export class AddPurchaseLevelDialogComponent implements OnInit {
  isCategoryTypeChoosed: boolean;
  isItemTypeChoosed: boolean;
  levelTypes: PurchasePolicyLevelStateFacade[];
  currentLevelType: PurchasePolicyLevelStateFacade;
  categories: string[];
  currentValue: string;
  constructor(
    public dialogRef: MatDialogRef<AddPurchaseLevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private config: ConfigService,
    private messageService: MessageService,
    private policiesService: PoliciesService
  ) { }

  ngOnInit(): void {
    this.levelTypes = [];
    this.currentLevelType = undefined;
    this.isCategoryTypeChoosed = false;
    this.isItemTypeChoosed = false;
    this.reset();
  }

  
  selectLevelType(levelType: PurchasePolicyLevelStateFacade, event: any) {
    if (event.isUserInput) {
      this.currentValue = undefined;
      this.currentLevelType = levelType;
      this.isCategoryTypeChoosed =
        this.currentLevelType.type === new CategoryPurchasePolicyLevelStateFacade().type;
      this.isItemTypeChoosed =
        this.currentLevelType.type === new ItemPurchasePolicyLevelStateFacade().type;
    }
  }

  getLevelName(levelType: PurchasePolicyLevelStateFacade): string {
    if (levelType){
      return this.policiesService.getPurchasePolicyLevelStateName(levelType);
    }
    return "Please Set Level Type";
  }

  selectCategory(category: string, event: any) {
    if (event.isUserInput) {
      this.currentValue = category;
    }
  }

  isItemError(): boolean {
    if (
      this.isItemTypeChoosed &&
      this.currentLevelType 
    ) {
      const item = this.config.selectedShop.getItemByName(this.currentValue);
      if (item) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
  canSubmit(): boolean {
    return (
      this.currentLevelType &&
      !this.isItemError() &&
      (this.noNeedValue() || (this.currentValue && this.currentValue != ''))
    );
  }
  noNeedValue() {
    return this.currentLevelType.type === new ShopPurchasePolicyLevelStateFacade().type;
  }
  createData(): PurchasePolicyLevelStateFacade {
    if (!this.currentLevelType ||  !this.currentLevelType.type){
      return undefined;
    }
    switch (this.currentLevelType.type) {
      case new ShopPurchasePolicyLevelStateFacade().type:
        return this.currentLevelType;
      case new CategoryPurchasePolicyLevelStateFacade().type:
        const category = this.config.createCategoryFromString(
          this.currentValue
        );
        return new CategoryPurchasePolicyLevelStateFacade(category);
      case new ItemPurchasePolicyLevelStateFacade().type:
        const itemId = this.config.selectedShop.getItemByName(
          this.currentValue
        );
        if (itemId) {
          return new ItemPurchasePolicyLevelStateFacade(itemId.id);
          // return;
        } else {
          return undefined;
        }
    }
    return undefined;
  }

  reset() {
    this.levelTypes = this.policiesService.getAllSimplePurchasePolicyLevelStateFacade();
    this.categories = this.config.getAllCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
