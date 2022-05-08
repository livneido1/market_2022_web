import { Deserializer } from "v8";
import { AppointmentFacade } from "./AppointmentFacade";
import { Deserializeable } from "./deserializable";

export class ShopManagerAppointmentFacade extends AppointmentFacade implements Deserializeable {
    constructor(){
        super()
    }

    deserialize(value: any): this {
        return this
    }

}