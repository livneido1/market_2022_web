import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemFacade } from 'app/http/facadeObjects/ItemFacade';


export interface DialogData {
  relatedItem: ItemFacade;
}


@Component({
  selector: 'app-item-mat-dialog',
  templateUrl: './item-mat-dialog.component.html',
  styleUrls: ['./item-mat-dialog.component.scss']
})
export class ItemMatDialogComponent implements OnInit {

  item: ItemFacade;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.item = this.data.relatedItem;
   }

  ngOnInit(): void {

  }

}
