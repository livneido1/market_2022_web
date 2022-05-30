import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  EmployeeInfoComponent, EmployeeInfoData,
} from 'app/employee-info/employee-info.component';
import { AppointmentFacade } from 'app/http/facadeObjects/AppointmentFacade';
import { ObjectsDeserializer } from 'app/http/facadeObjects/objects-deserializer';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { ShopManagerAppointmentFacade } from 'app/http/facadeObjects/shop-manager-appointment-facade';
import { ShopOwnerAppointmentFacade } from 'app/http/facadeObjects/ShopOwnerAppointmentFacade';
import { GetShopEmployeesRequest } from 'app/http/requests/get-shop-employees-request';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';

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
    private modelAdapter: ModelAdapterService,
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
      isEditable: false,
      appointment: appointment,
      butoonText: '',
      isNewAppointment: false
    };
    const dialogRef = this.dialog.open(EmployeeInfoComponent, {
      width: '500px',
      data: data,
    });
    dialogRef.afterClosed().subscribe();
  }

  setAppointmentPermissions(appointment: AppointmentFacade) {}

  removeAppointment(appointment: AppointmentFacade) {}

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
