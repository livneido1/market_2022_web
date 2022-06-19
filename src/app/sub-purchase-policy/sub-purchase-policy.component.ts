import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPurchaseLevelDialogComponent } from 'app/add-purchase-level-dialog/add-purchase-level-dialog.component';
import { PurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-type-facade';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { PoliciesService } from 'app/services/policies-service.service';

@Component({
  selector: 'app-sub-purchase-policy',
  templateUrl: './sub-purchase-policy.component.html',
  styleUrls: ['./sub-purchase-policy.component.scss']
})
export class SubPurchasePolicyComponent implements OnInit {

  currentLevels: PurchasePolicyTypeFacade[];
  amount: number;
  constructor(
    public dialog: MatDialog,
    private config: ConfigService,
    private messageService: MessageService,
    private discountService: PoliciesService,
    private engine: EngineService
  ) { }

  ngOnInit(): void {
    this.currentLevels = [];
    this.amount = 0;
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
    const data: MergeLevelData = { discountLevels: this.currentLevels };
    const dialogRef = this.dialog.open(MergeLevelDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result: DiscountLevelStateFacade[]) => {
      if (result) {
        this.currentLevels = result;
      }
    });
  }
  getLevelName(level: DiscountLevelStateFacade) {
    return level.title;
  }

  isPercantageError() {
    const isError = !this.amount || this.amount < 1;
    return isError;
  }
  canSubmit() {
    return (
      this.exactOneLevel() &&
      this.atMostOneCondition() &&
      !this.isPercantageError()
    );
  }

  removeCondition(condition: ConditionFacade){
    const index = this.currentConditions.indexOf(condition);
    if (index >-1){
      this.currentConditions.splice(index,1);
    }
  }

  removeLevel(level:DiscountLevelStateFacade){
    const index = this.currentLevels.indexOf(level);
    if (index >-1){
      this.currentLevels.splice(index,1);
    }
  }

  onSubmitClick() {
    if (!this.exactOneLevel()) {
      this.messageService.errorMessage(
        'cannot submit with more or less then 1 level facade, merge or create new level'
      );
      return;
    }
    if (!this.atMostOneCondition) {
      this.messageService.errorMessage(
        'cannot submit with more then one condition, please merge the conditions'
      );
      return;
    }

    const discount: DiscountTypeFacade = this.createDiscountType();
    this.discountService.createdDiscountList.push(discount)
    this.config.isAddNewDiscountClicked = true;

  }

  canMergeConditions(){
    return this.currentConditions && this.currentConditions.length>0;
  }
  canMergeLevels(){
    return this.currentLevels && this.currentLevels.length>0;
  }
  private createDiscountType() {
    let discount: DiscountTypeFacade;
    const levelState: DiscountLevelStateFacade = this.currentLevels[0];
    // conditional discount
    if (this.currentConditions.length > 0) {
      const condition: ConditionFacade = this.currentConditions[0];
      discount = new ConditionalDiscountFacade(
        this.amount,
        levelState,
        condition
      );
    }
    // simple discount
    else {
      discount = new SimpleDiscountFacade(this.amount, levelState);
    }
    return discount;
  }

  public exactOneLevel() {
    return this.currentLevels.length === 1;
  }

  public atMostOneCondition() {
    return this.currentConditions.length <= 1;
  }
}

}
