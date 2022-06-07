import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddLevelDialogComponent } from 'app/add-level-dialog/add-level-dialog.component';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
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

  dataConds = [
    {name:"cond 1"},
    {name:"cond 2"},

  ]
  constructor(
    public dialog: MatDialog,
    private config: ConfigService,
    private messageService: MessageService,
    private discountService: DiscountService,

  ) { }

  ngOnInit(): void {
    this.currentLevels = [];
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
    let name = this.discountService.getLevelTextFromType(level.type);
    return name;
  }


}
