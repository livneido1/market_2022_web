import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'app/item-mat-dialog/item-mat-dialog.component';

@Component({
  selector: 'app-open-new-shop-dialog',
  templateUrl: './open-new-shop-dialog.component.html',
  styleUrls: ['./open-new-shop-dialog.component.scss']
})
export class OpenNewShopDialogComponent implements OnInit {

  shopName: string;
  constructor(
    public dialogRef: MatDialogRef<OpenNewShopDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.shopName = "";
     }

  ngOnInit(): void {
  }

  canSubmit(){
    return (this.shopName && this.shopName !== "");
  }
  onNoClick() : void {
    this.dialogRef.close();
  }


}
