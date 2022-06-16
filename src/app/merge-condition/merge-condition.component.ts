import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompositeConditionFacade } from 'app/http/facadeObjects/Discounts/composite-condition-facade';
import { ConditionFacade } from 'app/http/facadeObjects/Discounts/condition-facade';
import { ConfigService } from 'app/services/config-service.service';
import { DiscountService } from 'app/services/discount-service.service';
import { MessageService } from 'app/services/message.service';


export interface MergeConditionData {
  existingConditions: ConditionFacade[];
}
@Component({
  selector: 'app-merge-condition',
  templateUrl: './merge-condition.component.html',
  styleUrls: ['./merge-condition.component.scss']
})
export class MergeConditionComponent implements OnInit {

  existingConditions: ConditionFacade[];
  conditionMap: Map<ConditionFacade, boolean>;
  allCompositeCondition: CompositeConditionFacade[];
  constructor(
    public dialogRef: MatDialogRef<MergeConditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MergeConditionData,
    private config: ConfigService,
    private message: MessageService,
    private discountService: DiscountService
  ) { 
    this.existingConditions = data.existingConditions;
    this.conditionMap = new Map();
    for (const condition of this.existingConditions) {
      this.conditionMap.set(condition, false);
    }
    this.allCompositeCondition = this.discountService.getAllCompositeConditionFacade();
  }

  ngOnInit(): void {
  }

  onUpdateMap(level: ConditionFacade, checked: boolean) {
    this.conditionMap.set(level, checked);
  }

  getConditionName(level: ConditionFacade): string {
    return level.title;
  }

  
  onOperatorClick(compositeCondition:CompositeConditionFacade):ConditionFacade[] {
    const toggledLevels = [];
    const res = [];
    for (const conditionEntry of this.conditionMap.entries()) {
      const condition = conditionEntry[0];
      const isToggled = conditionEntry[1];
      if (isToggled) {
        toggledLevels.push(condition);
      } else {
        res.push(condition);
      }
    }
    if (toggledLevels.length >1){
      compositeCondition.conditionFacadeList = [];
      compositeCondition.conditionFacadeList.push(...toggledLevels);
      res.push(compositeCondition);
      return res;
    }
    return [];
  }

  canSubmit() {
    let counter = 0;
    for (const val of this.conditionMap.values()) {
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
