import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentFacade } from 'app/http/facadeObjects/AppointmentFacade';
import { PermissionFacade } from 'app/http/facadeObjects/PermissionFacade';
import { ShopManagerAppointmentFacade } from 'app/http/facadeObjects/shop-manager-appointment-facade';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';

export interface EmployeeInfoData {
  isPermissionsEditable: boolean;
  appointment: AppointmentFacade;
  buttonText: string;
  isNewAppointment: boolean;
}

export interface EmployeeInfoReturnData {
  appointed: string;
  type: string;
  permissions: PermissionFacade[];
}

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
  types: string[];
  appointed: string;
  supervisor: string; // supervisor
  buttonText: string;
  isPermissionsEditable: boolean;
  shopName: string;
  availablePermits: string[];
  type: string;
  currentPermits: Map<string, boolean>; //permitName, value
  isNewAppointment: boolean;

  constructor(
    public dialogRef: MatDialogRef<EmployeeInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeInfoData,
    private config: ConfigService,
    private message: MessageService,
    private modelAdapter: ModelAdapterService
  ) {
    this.availablePermits = this.modelAdapter.getAllPermissions();
    this.types = this.modelAdapter.getAllAppointmentTypes();
    this.appointed = data.appointment.appointed;
    this.buttonText = data.buttonText;
    this.isPermissionsEditable = data.isPermissionsEditable;
    this.isNewAppointment = data.isNewAppointment;
    this.shopName = data.appointment.relatedShop
      ? data.appointment.relatedShop
      : '';
    this.supervisor = data.appointment.superVisor
      ? data.appointment.superVisor
      : '';
    const currType = this.modelAdapter.getTypeName(data.appointment.type);
    this.type = currType ? currType : '';
    this.setUpPermitMap(data.appointment.permissions);
  }

  ngOnInit(): void {}

  canSubmit():boolean {
    if (!this.isNewAppointment) {
      return true;
    } else {
      return  this.type && this.types.includes(this.type) &&
              this.appointed && this.appointed !== '' ;
    }
  }

  createData(){
    const permissions:PermissionFacade[] = [];
    for (const entry of this.currentPermits.entries()){
      if (entry[1]){
        const permit = this.modelAdapter.getPermissionFromText(entry[0]);
        permissions.push(permit);
      }
    }
    const data: EmployeeInfoReturnData = {
      appointed: this.appointed,
      type: this.type,
      permissions: permissions
    }
    return data;
  }
  updatePermits(permit: string, checked: boolean) {
    this.currentPermits.set(permit, checked);
  }



  setUpPermitMap(initPermits: PermissionFacade[]) {
    this.currentPermits = new Map();
    //init all to false
    for (const permission of this.availablePermits) {
      this.currentPermits.set(permission, false);
    }
    //enteres the true values
    if (initPermits) {
      for (const permission of initPermits) {
        const permitName = this.modelAdapter.permissionToText(permission.name);
        this.currentPermits.set(permitName, true);
      }
    }
  }

  chooseType(event: any) {
    this.type = event.value;
    if (this.type == "Owner"){
      for (const permit of this.currentPermits.keys()){
        this.currentPermits.set(permit, true);
      }
      this.isPermissionsEditable = false;
    }
    else{
      this.isPermissionsEditable = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
