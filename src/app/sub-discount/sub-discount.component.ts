import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddConditionDialogComponent } from 'app/add-condition-dialog/add-condition-dialog.component';
import { AddLevelDialogComponent } from 'app/add-level-dialog/add-level-dialog.component';
import { ConditionFacade } from 'app/http/facadeObjects/Discounts/condition-facade';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { MergeConditionComponent, MergeConditionData } from 'app/merge-condition/merge-condition.component';
import { MergeLevelData, MergeLevelDialogComponent } from 'app/merge-level-dialog/merge-level-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { DiscountService } from 'app/services/discount-service.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-sub-discount',
  templateUrl: './sub-discount.component.html',
  styleUrls: ['./sub-discount.component.scss']
})
export class SubDiscountComponent implements OnInit {

  currentLevels: DiscountLevelStateFacade[];
  currentConditions : ConditionFacade[];
  currentPercentage:number;
  
  constructor(
    public dialog: MatDialog,
    private config: ConfigService,
    private messageService: MessageService,
    private discountService: DiscountService,
    
  ) { 

  }

  ngOnInit(): void {
    this.currentLevels = [];
    this.currentConditions = [];
    this.currentPercentage = 0;
  }

  onAddConditionClick(){
    const dialogRef = this.dialog.open(AddConditionDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.currentConditions.push(result);
      }
    });
  }

  addLevel(){
    const dialogRef = this.dialog.open(AddLevelDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.currentLevels.push(result);
      }
    });
  }

  onMergeConditions(){
    const data: MergeConditionData = {existingConditions : this.currentConditions };
    const dialogRef = this.dialog.open(MergeConditionComponent, {
      width: '500px',
      data:data,
    });

    dialogRef.afterClosed().subscribe((result: ConditionFacade[]) => {
      if (result){
        this.currentConditions = result;
      }
    });
  }
  onMergeLevels(){
    const data: MergeLevelData = {discountLevels : this.currentLevels }
    const dialogRef = this.dialog.open(MergeLevelDialogComponent, {
      width: '500px',
      data:data,
    });

    dialogRef.afterClosed().subscribe((result: DiscountLevelStateFacade[]) => {
      if (result){
        this.currentLevels = result;
      }
    });
  }
  getLevelName(level:DiscountLevelStateFacade){
    return level.title;
  } 

  isPercantageError(){
    const isError = !this.currentPercentage || this.currentPercentage < 1;
    return isError;
  }
  canSubmit(){
    return this.exactOneLevel() &&
    this.exactOneCondition() &&
    !this.isPercantageError();
    
  }



  public exactOneLevel() {
    return this.currentLevels.length === 1;
  }

  public exactOneCondition() {
    return this.currentConditions.length === 1;
  }
}
