import { Injectable } from '@angular/core';
import { AppointmentFacade } from 'app/http/facadeObjects/AppointmentFacade';
import { PermissionFacade } from 'app/http/facadeObjects/PermissionFacade';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { ShopManagerAppointmentFacade } from 'app/http/facadeObjects/shop-manager-appointment-facade';
import { ShopOwnerAppointmentFacade } from 'app/http/facadeObjects/ShopOwnerAppointmentFacade';

@Injectable({
  providedIn: 'root'
})
export class ModelAdapterService {

  constructor() { }




  getAllPermissions(): string[] {
    return ['Employees edit', 'See History', 'Can Approve Bids', 'Inventory Permission'];
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
      case 'Can Approve Bids':
        permit.name = 'ApproveBidPermission';
        return permit;
      case 'Inventory Permission':
        permit.name = 'EditInventoryPermission';
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
        case "ApproveBidPermission":
          return "Can Approve Bids";
        case "EditInventoryPermission":
          return 'Inventory Permission';
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


  hasPermission(shop:ShopFacade, visitorName:string, permission: string):boolean{
    if (shop.employees.has(visitorName)){
      const app:AppointmentFacade = shop.employees.get(visitorName);
      for (const permit of app.permissions){
        if (permit.name === permission){
          return true;
        }
      }
    }
    return false;
  }
}
