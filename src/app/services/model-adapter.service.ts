import { Injectable } from '@angular/core';
import { AppointmentFacade } from 'app/http/facadeObjects/AppointmentFacade';
import { PermissionFacade } from 'app/http/facadeObjects/PermissionFacade';
import { ShopManagerAppointmentFacade } from 'app/http/facadeObjects/shop-manager-appointment-facade';
import { ShopOwnerAppointmentFacade } from 'app/http/facadeObjects/ShopOwnerAppointmentFacade';

@Injectable({
  providedIn: 'root'
})
export class ModelAdapterService {

  constructor() { }




  getAllPermissions(): string[] {
    return ['Employees edit', 'See History'];
  }
  getPermissionFromText(text: string): PermissionFacade {
    const permit = new PermissionFacade();
    switch (text) {
      case 'Employees edit':
        permit.name = 'EmployeesPermission';
        return permit;
      case 'See History':
        permit.name = 'PurchaseHistoryPermission';
        return permit;
    }
    return undefined;
  }

  permissionToText(permit:string):string{
      switch (permit){
        case "EmployeesPermission":
          return "Employees edit";
        case "PurchaseHistoryPermission":
          return "See History";
      }
      return undefined;
  }



  getTypeName(type: string): string {
    switch (type) {
      case 'ShopOwnerAppointmentFacade':
        return 'Owner';
      case 'ShopManagerAppointmentFacade':
        return 'Manager';
      default:
        return undefined;
    }
  }

  getAllAppointmentTypes(): string[] {
    return ['Manager', 'Owner'];
  }

  getAppointmentTextToObject(appointment: string): AppointmentFacade {
    switch (appointment) {
      case 'Owner':
        const owner = new ShopOwnerAppointmentFacade();
        owner.type = 'ShopOwnerAppointmentFacade';
        return owner;
      case 'Manager':
        const manager = new ShopManagerAppointmentFacade();
        manager.type = 'ShopManagerAppointmentFacade';
        return manager;
    }
    return undefined;
  }
}
