import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApproveAppointmentRequest } from 'app/http/requests/approve-appointment-request';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';

export interface PendingAppsData {
  names: string[];
}

export interface PendingAppsReturnValue{
  checked:string[];
  approve: boolean
}

@Component({
  selector: 'app-approve-pending-apps-dialog',
  templateUrl: './approve-pending-apps-dialog.component.html',
  styleUrls: ['./approve-pending-apps-dialog.component.scss'],
})
export class ApprovePendingAppsDialogComponent implements OnInit {
  pendingMembers: string[];
  pendingMap: Map<string, boolean>;
  constructor(
    public dialogRef: MatDialogRef<ApprovePendingAppsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PendingAppsData,
    private config: ConfigService,
    private messageService: MessageService,
    private engine: EngineService
  ) {
    this.pendingMembers = data.names;
    this.pendingMap = new Map();
    for (const name of this.pendingMembers) {
      this.pendingMap.set(name, false);
    }
  }

  ngOnInit(): void {}

  onClickChange(name:string,  event: any){
    if (event.isUserInput){
      this.pendingMap.set(name, event.checked);
    }
  }

  canSubmit():boolean{
    for (const checked of this.pendingMap.values()){
      if (checked){
        return true;
      }
    }
    return false;
  }

  getAllCheckedNames():string[]{
    const res:string[] = [];
    for (const entry of this.pendingMap.entries()){
      const checked = entry[1];
      if (checked){
        res.push(entry[0]);
      }
    }
    return res;
  }


  returnData(approve:boolean){
    const checked = this.getAllCheckedNames();
    const data: PendingAppsReturnValue = {
      checked: checked,
      approve: approve
    }
    return data;
  }
}
