import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryLevelStateFacade } from 'app/http/facadeObjects/Discounts/category-level-state-facade';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { ItemLevelStateFacade } from 'app/http/facadeObjects/Discounts/item-level-state-facade';
import { ShopLevelStateFacade } from 'app/http/facadeObjects/Discounts/shop-level-state-facade';
import { DialogData } from 'app/item-mat-dialog/item-mat-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { DiscountService } from 'app/services/discount-service.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-add-level-dialog',
  templateUrl: './add-level-dialog.component.html',
  styleUrls: ['./add-level-dialog.component.scss'],
})
export class AddLevelDialogComponent implements OnInit {
  isCategoryTypeChoosed: boolean;
  isItemTypeChoosed: boolean;
  levelTypes: DiscountLevelStateFacade[];
  currentLevelType: DiscountLevelStateFacade;
  categories: string[];
  currentValue: string;
  constructor(
    public dialogRef: MatDialogRef<AddLevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private config: ConfigService,
    private messageService: MessageService,
    private discountService: DiscountService
  ) {}

  ngOnInit(): void {
    this.levelTypes = [];
    this.currentLevelType = undefined;
    this.isCategoryTypeChoosed = false;
    this.isItemTypeChoosed = false;
    this.reset();
  }

  selectLevelType(levelType: DiscountLevelStateFacade, event: any) {
    if (event.isUserInput) {
      this.currentValue = undefined;
      this.currentLevelType = levelType;
      this.isCategoryTypeChoosed =
        this.currentLevelType.type === new CategoryLevelStateFacade().type;
      this.isItemTypeChoosed =
        this.currentLevelType.type === new ItemLevelStateFacade().type;
    }
  }

  getLevelName(levelType: DiscountLevelStateFacade): string {
    return levelType.title;
  }

  selectCategory(category: string, event: any) {
    if (event.isUserInput) {
      this.currentValue = category;
    }
  }

  getCurrentVal() {
    return this.currentValue;
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
    return this.currentLevelType.type === new ShopLevelStateFacade().type;
  }
  createData(): DiscountLevelStateFacade {
    switch (this.currentLevelType.type) {
      case new ShopLevelStateFacade().type:
        return this.currentLevelType;
      case new CategoryLevelStateFacade().type:
        const category = this.config.createCategoryFromString(
          this.currentValue
        );
        return new CategoryLevelStateFacade(category);
      case new ItemLevelStateFacade().type:
        const itemId = this.config.selectedShop.getItemByName(
          this.currentValue
        );
        if (itemId) {
          return new ItemLevelStateFacade(itemId.id);
          // return;
        } else {
          return undefined;
        }
    }
    return undefined;
  }

  reset() {
    this.levelTypes = this.discountService.getAllSimpleLevelTypes();
    this.categories = this.config.getAllCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
