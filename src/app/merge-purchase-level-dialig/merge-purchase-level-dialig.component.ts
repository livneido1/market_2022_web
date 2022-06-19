import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompositePurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/composite-purchase-policy-level-state-facade';
import { PurchasePolicyLevelStateFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-level-state-facade';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';
import { PoliciesService } from 'app/services/policies-service.service';

export interface MergePurchaseLevelData {
  levels: PurchasePolicyLevelStateFacade[];
}
@Component({
  selector: 'app-merge-purchase-level-dialig',
  templateUrl: './merge-purchase-level-dialig.component.html',
  styleUrls: ['./merge-purchase-level-dialig.component.scss'],
})
export class MergePurchaseLevelDialigComponent implements OnInit {
  purchaseLevels: PurchasePolicyLevelStateFacade[];
  levelMap: Map<PurchasePolicyLevelStateFacade, boolean>;
  returnVal: PurchasePolicyLevelStateFacade[];
  allCompositeTypes: CompositePurchasePolicyLevelStateFacade[];

  constructor(
    public dialogRef: MatDialogRef<MergePurchaseLevelDialigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MergePurchaseLevelData,
    private config: ConfigService,
    private message: MessageService,
    private policiesService: PoliciesService
  ) {
    this.purchaseLevels = data.levels;
    this.levelMap = new Map();
    for (const level of this.purchaseLevels) {
      this.levelMap.set(level, false);
    }
    this.returnVal = [];
    this.allCompositeTypes =
      this.policiesService.getAllCompositePurchasePolicyLevelStateFacade();
  }

  ngOnInit(): void {}
  onUpdateMap(level: PurchasePolicyLevelStateFacade, checked: boolean) {
    this.levelMap.set(level, checked);
  }

  getLevelName(level: PurchasePolicyLevelStateFacade): string {
    return this.policiesService.getPurchasePolicyLevelStateName(level);
  }

  onOperatorClick(
    levelState: CompositePurchasePolicyLevelStateFacade
  ): PurchasePolicyLevelStateFacade[] {
    const toggledLevels = [];
    const res = [];
    for (const levelEntry of this.levelMap.entries()) {
      const level = levelEntry[0];
      const toggled = levelEntry[1];
      if (toggled) {
        toggledLevels.push(level);
      } else {
        res.push(level);
      }
    }
    if (toggledLevels.length > 1) {
      levelState.purchasePolicyLevelStateFacades = [];
      levelState.purchasePolicyLevelStateFacades.push(...toggledLevels);
      res.push(levelState);
      this.returnVal = res;
    }
    return this.returnVal;
  }

  canSubmit() {
    let counter = 0;
    for (const val of this.levelMap.values()) {
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
