import { Deserializable } from './deserializable';
import { MemberFacade } from './MemberFacade';
import { PermissionFacade } from './PermissionFacade';
import { ShopFacade } from './shop-facade';
import { ShopManagerAppointmentFacade } from './shop-manager-appointment-facade';
import { ShopOwnerAppointmentFacade } from './ShopOwnerAppointmentFacade';

export abstract class AppointmentFacade {
  appointed: string; //  the actual appointed member
  superVisor: string; //  member appointedMe
  relatedShop: string;
  permissions: PermissionFacade[];
  type: string;

  constructor(
    appointed?: string,
    superVisor?: string,
    relatedShop?: string,
    permissions?: PermissionFacade[],
    type?: string
  ) {
    this.appointed = appointed? appointed : '';
    this.superVisor = superVisor? superVisor : '';
    this.relatedShop = relatedShop? relatedShop : '';
    this.permissions = permissions? permissions : [];
    this.type = type? type : '';
  }

}
