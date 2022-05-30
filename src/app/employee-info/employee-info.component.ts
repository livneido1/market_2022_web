import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentFacade } from 'app/http/facadeObjects/AppointmentFacade';
import { PermissionFacade } from 'app/http/facadeObjects/PermissionFacade';
import { ShopManagerAppointmentFacade } from 'app/http/facadeObjects/shop-manager-appointment-facade';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';

export interface EmployeeInfoData {
  isEditable: boolean;
  appointment: AppointmentFacade;
  butoonText: string;
  isNewAppointment: boolean;
}

export interface EmployeeInfoReturnData {
  appointed: string;
  supervisor: string;
  type: string;
  permissions: string[];
  shopName: string;
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
  isEditable: boolean;
  shopName: string;
  availablePermits: string[];
  type: string;
  currentPermits:Map<string, boolean>;  //permitName, value

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
    this.buttonText = data.butoonText;
    this.isEditable = data.isEditable;
    this.shopName = data.appointment.relatedShop
      ? data.appointment.relatedShop
      : '';
    this.supervisor = data.appointment.superVisor
      ? data.appointment.superVisor
      : '';
    this.type = this.modelAdapter.getTypeName(data.appointment.type);
    this.setUpPermitMap(data.appointment.permissions);



  }

  ngOnInit(): void {
  }


  updatePermits(permit:string ,checked:boolean) {
    const s = permit;
    const t = checked;
  }

  setUpPermitMap(initPermits: PermissionFacade[]) {
    this.currentPermits = new Map();
    //init all to false
    for (const permission of this.availablePermits) {
      this.currentPermits.set(permission, false);
    }
    //enteres the true values
    if (initPermits){
      for (const permission of initPermits) {
        const permitName = this.modelAdapter.permissionToText(permission.name);
        this.currentPermits.set(permitName, true);
      }
    }
  }

  testHere(event: any) {
    const selectType = event.value;
    this.type = selectType;
    return 3;
  }
}
