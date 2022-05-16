
import { AppointmentFacade } from './AppointmentFacade';
import { Deserializable } from './deserializable';
import { MemberFacade } from './MemberFacade';
import { ShopFacade } from './shop-facade';

export class ShopOwnerAppointmentFacade extends AppointmentFacade implements Deserializable {

  isShopFounder:boolean;


  constructor() {
    super();
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
