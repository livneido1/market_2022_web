import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompositeDiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/composite-discount-level-state-facade';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { ConfigService } from 'app/services/config-service.service';
import { DiscountService } from 'app/services/discount-service.service';
import { MessageService } from 'app/services/message.service';

export interface MergeLevelData {
  discountLevels: DiscountLevelStateFacade[];
}
@Component({
  selector: 'app-merge-level-dialog',
  templateUrl: './merge-level-dialog.component.html',
  styleUrls: ['./merge-level-dialog.component.scss'],
})
export class MergeLevelDialogComponent implements OnInit {
  discountLevels: DiscountLevelStateFacade[];
  discountMap: Map<DiscountLevelStateFacade, boolean>;
  returnVal: DiscountLevelStateFacade[];
  allCompositeTypes: CompositeDiscountLevelStateFacade[];
  constructor(
    public dialogRef: MatDialogRef<MergeLevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MergeLevelData,
    private config: ConfigService,
    private message: MessageService,
    private discountService: DiscountService
  ) {
    this.discountLevels = data.discountLevels;
    this.discountMap = new Map();
    for (const level of this.discountLevels) {
      this.discountMap.set(level, false);
    }
    this.returnVal = [];
    this.allCompositeTypes = this.discountService.getAllDiscountCompositeLevelTypes();
  }

  ngOnInit(): void {}
  onUpdateMap(level: DiscountLevelStateFacade, checked: boolean) {
    this.discountMap.set(level, checked);
  }

  getLevelName(level: DiscountLevelStateFacade): string {
    return level.title;
  }

  onOperatorClick(levelState:CompositeDiscountLevelStateFacade):DiscountLevelStateFacade[] {
    const toggledLevels = [];
    const res = [];
    for (const levelEntry of this.discountMap.entries()) {
      const level = levelEntry[0];
      const toggled = levelEntry[1];
      if (toggled) {
        toggledLevels.push(level);
      } else {
        res.push(level);
      }
    }
    if (toggledLevels.length >1){
      levelState.discountLevelStateFacades = [];
      levelState.discountLevelStateFacades.push(...toggledLevels);
      res.push(levelState);
      this.returnVal = res;
    }
    return this.returnVal;
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
}
