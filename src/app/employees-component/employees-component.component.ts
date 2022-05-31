import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  EmployeeInfoComponent,
  EmployeeInfoData,
  EmployeeInfoReturnData,
} from 'app/employee-info/employee-info.component';
import { AppointmentFacade } from 'app/http/facadeObjects/AppointmentFacade';
import { ObjectsDeserializer } from 'app/http/facadeObjects/objects-deserializer';
import { PermissionFacade } from 'app/http/facadeObjects/PermissionFacade';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { ShopManagerAppointmentFacade } from 'app/http/facadeObjects/shop-manager-appointment-facade';
import { ShopOwnerAppointmentFacade } from 'app/http/facadeObjects/ShopOwnerAppointmentFacade';
import { AppointmentShopManagerRequest } from 'app/http/requests/appointment-shop-manager-request';
import { AppointmentShopOwnerRequest } from 'app/http/requests/appointment-shop-owner-request';
import { EditShopManagerPermissionsRequest } from 'app/http/requests/edit-shop-manager-permissions-request';
import { GetShopEmployeesRequest } from 'app/http/requests/get-shop-employees-request';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees-component',
  templateUrl: './employees-component.component.html',
  styleUrls: ['./employees-component.component.scss'],
})
export class EmployeesComponentComponent implements OnInit {
  isComponentValid: boolean;
  appointments: AppointmentFacade[];
  shop: ShopFacade;
  lastUpdate: string;
  constructor(
    private config: ConfigService,
    private engine: EngineService,
    private messageService: MessageService,
    public dialog: MatDialog,
    private modelAdapter: ModelAdapterService
  ) {
    this.appointments = [];
    this.resetComponent();
    this.isComponentValid = false;
  }

  ngOnInit(): void {}

  getTypeName(type: string): string {
    return this.modelAdapter.getTypeName(type);
  }

  openAppointmentInfo(appointment: AppointmentFacade) {
    const data: EmployeeInfoData = {
      isPermissionsEditable: false,
      appointment: appointment,
      buttonText: '',
      isNewAppointment: false,
    };
    const dialogRef = this.openEmployeeForm(data);
    // ignore return value
    dialogRef.afterClosed().subscribe();
  }

  setAppointmentPermissions(appointment: AppointmentFacade) {
    const data: EmployeeInfoData = {
      isPermissionsEditable: true,
      appointment: appointment,
      buttonText: 'Update Appointment',
      isNewAppointment: false,
    };
    const dialogRef = this.openEmployeeForm(data);
    dialogRef.afterClosed().subscribe((data: EmployeeInfoReturnData) => {});
  }
  addNewEmployee() {
    // this is only temporary appointment and will be changed as expected after window closed
    const appointment = new ShopManagerAppointmentFacade();
    appointment.superVisor = this.config.visitor.name;
    appointment.relatedShop = this.shop.shopName;
    appointment.permissions = [];
    appointment.type = '';
    appointment.appointed = '';

    const data: EmployeeInfoData = {
      isPermissionsEditable: true,
      appointment: appointment,
      buttonText: 'Update Appointment',
      isNewAppointment: true,
    };
    const dialogRef = this.openEmployeeForm(data);
    dialogRef.afterClosed().subscribe((data: EmployeeInfoReturnData) => {
      this.createNewAppointmentByType(data);
    });
  }

  removeAppointment(appointment: AppointmentFacade) {}

  private createNewAppointmentByType(data: EmployeeInfoReturnData) {
    const type = data.type;
    const appointment = this.modelAdapter.getAppointmentTextToObject(type);
    let request = undefined;
    let serverAnswer: Observable<Response> = undefined;
    if (appointment instanceof ShopManagerAppointmentFacade) {
      request = new AppointmentShopManagerRequest(
        this.config.visitor.name,
        data.appointed,
        this.shop.shopName
      );
      this.appointManager(request, data);
    } else if (appointment instanceof ShopOwnerAppointmentFacade) {
      request = new AppointmentShopOwnerRequest(
        this.config.visitor.name,
        data.appointed,
        this.shop.shopName
      );
      this.appointOwner(request, data);
    }
  }

  private appointOwner(request: AppointmentShopOwnerRequest,data: EmployeeInfoReturnData) {
    this.engine.appointShopOwner(request).subscribe((responseJson) => {
      const response = new Response().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        this.messageService.validMessage("successfully appointed!");
        this.resetComponent();
      }
    });
  }
  private appointManager(request: AppointmentShopManagerRequest,data: EmployeeInfoReturnData) {
    this.engine.appointShopManager(request).subscribe((responseJson) => {
      const response = new Response().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        const appoint = new ShopManagerAppointmentFacade(
          request.appointedShopManager,
          this.config.visitor.name,
          this.shop.shopName,
          data.permissions,
          data.type
        );
        const permitRequest = new EditShopManagerPermissionsRequest(
          this.config.visitor.name,
          request.appointedShopManager,
          this.shop.shopName,
          appoint
        );
        this.engine.editShopManagerPermissions(permitRequest).subscribe(responseJson2=>{
          const res = new Response().deserialize(responseJson2);
          if (res.isErrorOccurred()){
            this.messageService.errorMessage(res.getMessage());
            return;
          }
          else{
            this.messageService.validMessage("successfully appointed!");
          }
          this.resetComponent();
        })
      }
    });
  }

  private openEmployeeForm(data: EmployeeInfoData) {
    return this.dialog.open(EmployeeInfoComponent, {
      width: '500px',
      data: data,
    });
  }
  resetComponent() {
    const request = new GetShopEmployeesRequest(
      this.config.visitor.name,
      this.config.selectedShop.shopName
    );
    this.engine.getShopEmployeesInfo(request).subscribe((responseJson) => {
      const response = new ResponseT<AppointmentFacade[]>().deserialize(
        responseJson
      );
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        this.lastUpdate = new Date().toLocaleString();
        this.shop = this.config.selectedShop;
        this.appointments = [];
        const objDeserializer = new ObjectsDeserializer();
        for (const employeeJson of response.value) {
          const employee = objDeserializer.getAppoitmentFacade(employeeJson);
          this.appointments.push(employee);
        }
        this.isComponentValid = true;
      }
    });
  }
}
