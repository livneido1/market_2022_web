import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { MemberFacade } from './MemberFacade';
import { PermissionFacade } from './PermissionFacade';
import { ShopFacade } from './shop-facade';

export class ShopOwnerAppointmentFacade
  extends AppointmentFacade
  implements Deserializable
{
  isShopFounder: boolean;

  constructor(
    appointed?: string,
    superVisor?: string,
    relatedShop?: string,
    permissions?: PermissionFacade[],
    type?: string
  ) {
    super(appointed, superVisor, relatedShop, permissions, type);
    this.isShopFounder = false;
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    this.isShopFounder = value.isShopFounder;

    return this;
  }
}
