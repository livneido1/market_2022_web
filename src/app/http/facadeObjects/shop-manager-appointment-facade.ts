import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { MemberFacade } from './MemberFacade';
import { ShopFacade } from './shop-facade';

export class ShopManagerAppointmentFacade
  extends AppointmentFacade
  implements Deserializable
{
  constructor() {
    super();
  }

  deserialize(value: any): this {
    if (!value) {
      return this;
    }
    Object.assign(this, value);
    // this.appointed = new MemberFacade().deserialize(value.appointed);
    // this.superVisor = new MemberFacade().deserialize(value.superVisor);
    // // this.relatedShop = new ShopFacade().deserialize(value.relatedShop);
    // this.permissions = [];
    // for (const permission of value.permissions) {
    //   this.permissions.push(permission);
    // }

    return this;
  }
}
