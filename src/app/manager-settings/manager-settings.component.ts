import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetStringValueComponent } from 'app/get-string-value/get-string-value.component';
import {
  GetValueDialogComponent,
  GetValueDialogData,
} from 'app/get-value-dialog/get-value-dialog.component';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { GetHistoryByMemberRequest } from 'app/http/requests/get-history-by-member-request';
import { GetMarketInfoRequest } from 'app/http/requests/get-market-info-request';
import { RemoveMemberRequest } from 'app/http/requests/remove-member-request';
import { TwoStringRequest } from 'app/http/requests/two-string-request';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import {
  ShowTextDialogComponent,
  TextData,
} from 'app/show-text-dialog/show-text-dialog.component';

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
            if (response.isErrorOccurred()) {
              this.messageService.errorMessage(response.getMessage());
            } else {
              this.messageService.validMessage(
                'member successfully removed from system'
              );
            }
          });
      }
    });
  }

  showMemberHistory() {
    const data: GetValueDialogData = {
      title: 'name a member to watch history',
      buttonText: 'show',
    };
    const dialogRef = this.dialog.open(GetStringValueComponent, {
      width: '250px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((memberName) => {
      if (memberName) {
        this.engine
          .getHistoryByMember(
            new GetHistoryByMemberRequest(this.config.visitor.name, memberName)
          )
          .subscribe((responseJson) => {
            const response = new ResponseT<string>().deserialize(responseJson);
            if (response.isErrorOccurred()) {
              this.messageService.errorMessage(response.getMessage());
            } else {
              const textData: TextData = {
                text: response.value,
              };
              const textRef = this.dialog.open(ShowTextDialogComponent, {
                width: '250px',
                data: textData,
              });
              textRef.afterClosed().subscribe();
            }
          });
      }
    });
  }

  getHistoryByShop() {
    const data: GetValueDialogData = {
      title: 'name a Shop to watch it history',
      buttonText: 'show',
    };
    const dialogRef = this.dialog.open(GetStringValueComponent, {
      width: '250px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((shopName) => {
      if (shopName) {
        this.engine
          .getHistoryByShop(
            new TwoStringRequest(this.config.visitor.name, shopName)
          )
          .subscribe((responseJson) => {
            const response = new ResponseT<string>().deserialize(responseJson);
            if (response.isErrorOccurred()) {
              this.messageService.errorMessage(response.getMessage());
            } else {
              const textData: TextData = {
                text: response.value,
              };
              const textRef = this.dialog.open(ShowTextDialogComponent, {
                width: '250px',
                data: textData,
              });
              textRef.afterClosed().subscribe();
            }
          });
      }
    });
  }

  showMarketInfo() {
    this.engine
      .getMarketInfo(new GetMarketInfoRequest(this.config.visitor.name))
      .subscribe((responseJson) => {
        const response = new ResponseT<string>().deserialize(responseJson);
        if (response.isErrorOccurred()){
          this.messageService.errorMessage(response.getMessage());
          return;
        }
        else{
          const textData: TextData = {
            text: response.value,
          };
          const textRef = this.dialog.open(ShowTextDialogComponent, {
            width: '250px',
            data: textData,
          });
          textRef.afterClosed().subscribe();
        }
      });
  }
}
