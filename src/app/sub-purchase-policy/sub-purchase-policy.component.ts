import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(
    public dialog: MatDialog,
    private config: ConfigService,
    private messageService: MessageService,
    private policiesService: PoliciesService,
    private engine: EngineService
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

  selectType(type: PurchasePolicyTypeFacade) {
    this.currentType = type;
  }

  removeLevel(level: PurchasePolicyLevelStateFacade) {
    const index = this.currentLevels.indexOf(level);
    if (index > -1) {
      this.currentLevels.splice(index, 1);
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
}
