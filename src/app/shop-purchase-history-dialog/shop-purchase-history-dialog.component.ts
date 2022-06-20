import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ShopPurchaseHistoryData {
  history: string;
}
@Component({
  selector: 'app-shop-purchase-history-dialog',
  templateUrl: './shop-purchase-history-dialog.component.html',
  styleUrls: ['./shop-purchase-history-dialog.component.scss'],
})
export class ShopPurchaseHistoryDialogComponent implements OnInit {
  history:string;
  constructor(
    public dialogRef: MatDialogRef<ShopPurchaseHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShopPurchaseHistoryData,
  ) {
    this.history = data.history;
  }

  ngOnInit(): void {}



}
