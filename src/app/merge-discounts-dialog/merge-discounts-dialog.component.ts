import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompositeDiscountTypeFacade } from 'app/http/facadeObjects/Discounts/composite-discount-type-facade';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { MergeLevelData } from 'app/merge-level-dialog/merge-level-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { PoliciesService } from 'app/services/policies-service.service';
import { MessageService } from 'app/services/message.service';

export interface MergeDiscountData {
  discounts: DiscountTypeFacade[];
}
@Component({
  selector: 'app-merge-discounts-dialog',
  templateUrl: './merge-discounts-dialog.component.html',
  styleUrls: ['./merge-discounts-dialog.component.scss'],
})
export class MergeDiscountsDialogComponent implements OnInit {
  discounts: DiscountTypeFacade[];
  discountMap: Map<DiscountTypeFacade, boolean>;
  allCompositeTypes: CompositeDiscountTypeFacade[];
  constructor(
    public dialogRef: MatDialogRef<MergeDiscountsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MergeDiscountData,
    private config: ConfigService,
    private message: MessageService,
    private discountService: PoliciesService
  ) {
    this.discounts = data.discounts;
    this.discountMap = new Map();
    this.allCompositeTypes =
      this.discountService.getAllCompositeDiscountTypes();
    for (const discount of this.discounts) {
      this.discountMap.set(discount, false);
    }
  }

  ngOnInit(): void {}
  getDiscountName(discount: DiscountTypeFacade): string {
    return this.discountService.getDiscountName(discount);
  }

  onOperatorClick(discount: CompositeDiscountTypeFacade): DiscountTypeFacade[] {
    const toggledDiscounts = [];
    const res: DiscountTypeFacade[] = [];
    for (const discountEntry of this.discountMap.entries()) {
      const simpleDiscount = discountEntry[0];
      const toggled = discountEntry[1];
      if (toggled) {
        toggledDiscounts.push(simpleDiscount);
      } else {
        res.push(simpleDiscount);
      }
    }
    if (toggledDiscounts.length > 1) {
      discount.discountTypes = [];
      discount.discountTypes.push(...toggledDiscounts);
      res.push(discount);
      return res;
    }
    return this.discounts;
  }

  canSubmit() {
    let counter = 0;
    for (const val of this.discountMap.values()) {
      if (val) {
        counter++;
        if (counter > 1) {
          return true;
        }
      }
    }
    return false;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdateMap(discount: DiscountTypeFacade, checked: boolean) {
    this.discountMap.set(discount, checked);
  }
}
