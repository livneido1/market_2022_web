import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { MemberFacade } from './MemberFacade';
import { PermissionFacade } from './PermissionFacade';
import { ShopFacade } from './shop-facade';

export class ShopManagerAppointmentFacade
  extends AppointmentFacade
  implements Deserializable
{
  constructor(
    appointed?: string,
    superVisor?: string,
    relatedShop?: string,
    permissions?: PermissionFacade[],
    type?: string
  ) {
    super(appointed, superVisor, relatedShop, permissions, "ShopManagerAppointmentFacade");
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    return this;
  }
}
