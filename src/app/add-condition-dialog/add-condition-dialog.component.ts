import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConditionFacade } from 'app/http/facadeObjects/Discounts/condition-facade';
import { ConditionalDiscountFacade } from 'app/http/facadeObjects/Discounts/conditional-discount-facade';
import { DialogData } from 'app/item-mat-dialog/item-mat-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { DiscountService } from 'app/services/discount-service.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-add-condition-dialog',
  templateUrl: './add-condition-dialog.component.html',
  styleUrls: ['./add-condition-dialog.component.scss']
})
export class AddConditionDialogComponent implements OnInit {

  isCategoryTypeChoosed: boolean;
  isItemTypeChoosed: boolean;
  conditionTypes: ConditionFacade[];
  currentConditionType: string;
  categories: string[];
  currentValue: string;
  returnVal: ConditionalDiscountFacade;


  constructor(
    public dialogRef: MatDialogRef<AddConditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private config: ConfigService,
    private messageService: MessageService,
    private discountService: DiscountService
  ) { }

  ngOnInit(): void {
  }



  reset(){
    this.conditionTypes =  this.discountService.getAllSimpleConditionsFacade();
  }
}
