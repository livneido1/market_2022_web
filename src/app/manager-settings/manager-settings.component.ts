import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetStringValueComponent } from 'app/get-string-value/get-string-value.component';
import {
  GetValueDialogComponent,
  GetValueDialogData,
} from 'app/get-value-dialog/get-value-dialog.component';
import { Response } from 'app/http/facadeObjects/response';
import { RemoveMemberRequest } from 'app/http/requests/remove-member-request';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-manager-settings',
  templateUrl: './manager-settings.component.html',
  styleUrls: ['./manager-settings.component.scss'],
})
export class ManagerSettingsComponent implements OnInit {
  constructor(
    private config: ConfigService,
    private engine: EngineService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  removeMember() {
    const data: GetValueDialogData = {
      title: 'name a member to remove',
      buttonText: 'Remove',
    };
    const dialogRef = this.dialog.open(GetStringValueComponent, {
      width: '250px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((memberName) => {
      if (memberName) {
        this.engine
          .removeMember(
            new RemoveMemberRequest(this.config.visitor.name, memberName)
          )
          .subscribe((responseJson) => {
            const response = new Response().deserialize(responseJson);
            if (response.isErrorOccurred()){
              this.messageService.errorMessage(response.getMessage());
            }
            else{
              this.messageService.validMessage("member successfully removed from system");
            }
          });
      }
    });
  }
}
