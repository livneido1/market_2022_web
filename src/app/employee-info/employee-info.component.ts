import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentFacade } from 'app/http/facadeObjects/AppointmentFacade';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';

export interface EmployeeInfoData {
  isEditable: boolean;
  appointment: AppointmentFacade;
  butoonText: string;
}

export  interface EmployeeInfoReturnData{
  appointed: string;
  supervisor:string;
  type: string;
  permissions:string[];
  shopName:string;

}

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
  types: string[];
  appointed: string;
  supervisor: string;    // supervisor
  buttonText: string;
  isEditable: boolean;
  shopName: string;
  permissions: string[];
  type:string;

  constructor(
    public dialogRef: MatDialogRef<EmployeeInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeInfoData,
    private config: ConfigService,
    private message: MessageService
  ) {
    this.appointed = data.appointment.appointed ;
    this.buttonText = data.butoonText;
    this.isEditable = data.isEditable;
    this.shopName = data.appointment.relatedShop? data.appointment.relatedShop : "" ;
    this.supervisor = data.appointment.superVisor? data.appointment.superVisor : "" ;
    this.type = this.getTypeName(data.appointment.type);
  }


  getTypeName(type:string): string{
    switch (type){
      case "ShopOwnerAppointmentFacade":
        return "Owner";
      case "ShopManagerAppointmentFacade":
        return "Manager";
      default:
        return "";
    }
  }

  updatePermits(){

  }

  testHere(event:any){
    const selectType = event.value;
    this.type = selectType;
    return 3;
  }
  ngOnInit(): void {
    this.permissions = this.config.getAllPermissions();
    this.types = this.config.getAllAppointmentTypes();
  }
}
