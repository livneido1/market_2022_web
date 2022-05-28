import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';

export interface GetValueDialogData {
  title: string;
  buttonText: string;
}

@Component({
  selector: 'app-get-value-dialog',
  templateUrl: './get-value-dialog.component.html',
  styleUrls: ['./get-value-dialog.component.scss'],
})
export class GetValueDialogComponent implements OnInit {
  value: any;
  title: string;
  buttonText: string;
  constructor(
    public dialogRef: MatDialogRef<GetValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GetValueDialogData,
    private config: ConfigService,
    private message: MessageService
  ) {
    this.title = this.data.title;
    this.buttonText = this.data.buttonText;
  }

  ngOnInit(): void {}
}
