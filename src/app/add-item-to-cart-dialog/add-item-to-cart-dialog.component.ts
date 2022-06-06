import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddItemDialogComponent } from 'app/add-item-dialog/add-item-dialog.component';
import { DialogData } from 'app/item-mat-dialog/item-mat-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-add-item-to-cart-dialog',
  templateUrl: './add-item-to-cart-dialog.component.html',
  styleUrls: ['./add-item-to-cart-dialog.component.scss'],
})
export class AddItemToCartDialogComponent implements OnInit {
  amount: number;
  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private config: ConfigService,
    private message: MessageService
  ) {}

  ngOnInit(): void {}
}
