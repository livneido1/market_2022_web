import { Deserializable } from './deserializable';
import { MemberFacade } from './MemberFacade';
import { PermissionFacade } from './PermissionFacade';
import { ShopFacade } from './shop-facade';

export abstract class AppointmentFacade {
  appointed: MemberFacade; //  the actual appointed member
  superVisor: MemberFacade; //  member appointedMe
  relatedShop: ShopFacade;
  permissions: PermissionFacade[];
  type: string;

  constructor() {

    this.appointed = Object();
    this.superVisor = Object();
    this.relatedShop = Object();
    this.permissions = [];
    this.type = '';

  }
}
