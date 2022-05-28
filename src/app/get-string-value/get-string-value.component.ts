import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetValueDialogData } from 'app/get-value-dialog/get-value-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-get-string-value',
  templateUrl: './get-string-value.component.html',
  styleUrls: ['./get-string-value.component.scss']
})
export class GetStringValueComponent implements OnInit {
  value: any;
  title: string;
  buttonText: string;
  constructor(
    public dialogRef: MatDialogRef<GetStringValueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GetValueDialogData,
    private config: ConfigService,
    private message: MessageService) {
      this.title = this.data.title;
      this.buttonText = this.data.buttonText;
   }

  ngOnInit(): void {
  }

}
