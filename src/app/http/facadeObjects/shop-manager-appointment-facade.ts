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
    return this;
  }
}
