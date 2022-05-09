import { Deserializable } from './deserializable';
import { MemberFacade } from './MemberFacade';
import { PermissionFacade } from './PermissionFacade';
import { ShopFacade } from './shop-facade';

export class AppointmentFacade   {
  appointed: MemberFacade; //  the actual appointed member
  superVisor: MemberFacade; //  member appointedMe
  relatedShop: ShopFacade;
  permissions: PermissionFacade[];
  type: string;

  constructor() {
    this.appointed = new MemberFacade();
    this.superVisor = new MemberFacade();
    this.relatedShop = new ShopFacade();
    this.permissions = [];
    this.type = '';
  }






}
