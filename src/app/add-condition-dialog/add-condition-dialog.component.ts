import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AmountOfItemConditionFacade } from 'app/http/facadeObjects/Discounts/amount-of-item-condition-facade';
import { ConditionFacade } from 'app/http/facadeObjects/Discounts/condition-facade';
import { ConditionalDiscountFacade } from 'app/http/facadeObjects/Discounts/conditional-discount-facade';
import { PriceConditionFacade } from 'app/http/facadeObjects/Discounts/price-condition-facade';
import { DialogData } from 'app/item-mat-dialog/item-mat-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { DiscountService } from 'app/services/discount-service.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-add-condition-dialog',
  templateUrl: './add-condition-dialog.component.html',
  styleUrls: ['./add-condition-dialog.component.scss'],
})
export class AddConditionDialogComponent implements OnInit {
  isItemTypeChoosed: boolean;
  simpleConditionTypes: ConditionFacade[];
  currentConditionType: ConditionFacade;
  categories: string[];
  firstCurrentValue: any;
  numericSecondValue: number;

  constructor(
    public dialogRef: MatDialogRef<AddConditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private config: ConfigService,
    private messageService: MessageService,
    private discountService: DiscountService
  ) {}

  ngOnInit(): void {
    this.reset();
  }

  selectCondition(simpleCondition: ConditionFacade, event: any) {
    if (event.isUserInput) {
      this.currentConditionType = simpleCondition;
    }
  }

  isItemError(): boolean {
    if (this.firstCurrentValue) {
      const item = this.config.selectedShop.getItemByName(
        this.firstCurrentValue
      );
      if (item) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  createData(): ConditionFacade {
    if (this.firstCurrentValue){
      if (this.isPriceCondition()) {
        return new PriceConditionFacade(this.firstCurrentValue);
      } else if (this.isAmountOfItemCondition() &&  this.numericSecondValue) {
        return this.createAmountCondition();
      }

    }
    return undefined;
  }

  createAmountCondition(): AmountOfItemConditionFacade {
    const item = this.config.selectedShop.getItemByName(this.firstCurrentValue);
    const amount = this.numericSecondValue;
    return new AmountOfItemConditionFacade(amount,item.id);
  }
  canSubmit(): boolean {
    return (
      !this.isAmountError() && !this.isItemError() && this.firstCurrentValue
    );
  }
  reset() {
    this.simpleConditionTypes =
      this.discountService.getAllSimpleConditionsFacade();
  }
  isAmountOfItemCondition(): boolean {
    if (
      this.currentConditionType &&
      this.currentConditionType.type === new AmountOfItemConditionFacade().type
    ) {
      return true;
    }
    return false;
  }

  isPriceCondition(): boolean {
    if (
      this.currentConditionType &&
      this.currentConditionType.type === new PriceConditionFacade().type
    ) {
      return true;
    }
    return false;
  }

  isAmountError(): boolean {
    if (this.isAmountOfItemCondition()) {
      return !(this.numericSecondValue > 0);
    }
    return true;
  }

  isPriceError(): boolean {
    if (this.isPriceCondition()) {
      return this.firstCurrentValue < 0;
    }
    return true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
