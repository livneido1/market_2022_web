import { NONE_TYPE } from "@angular/compiler";
import { PermissionFacade } from "./PermissionFacade";

export abstract class AppointmentFacade{
    protected appointed : member;       //  the actual appointed member
    protected superVisor : member;      //  member appointedMe
    protected relatedShop : shop;
    private permissions : PermissionFacade[];
    constructor(){
        this.appointed = undefined
        this.superVisor = undefined
        this.relatedShop = undefined
        this.permissions = []
    }
}