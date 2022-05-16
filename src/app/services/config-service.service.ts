import { Injectable } from '@angular/core';
import { AppointmentFacade } from 'app/http/facadeObjects/AppointmentFacade';
import { ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { MemberFacade } from 'app/http/facadeObjects/MemberFacade';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { ShopManagerAppointmentFacade } from 'app/http/facadeObjects/shop-manager-appointment-facade';
import { ShopOwnerAppointmentFacade } from 'app/http/facadeObjects/ShopOwnerAppointmentFacade';
import { VisitorFacade } from 'app/http/facadeObjects/visitor-facade';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  //general settings
  private _isMarketInitialized: boolean = true;
  //component booleans
  private _isRegisterClicked: boolean;
  private _isSearchItemClicked: boolean;
  private _isLoginClicked: boolean;
  private _isCartInfoClicked: boolean;
  private _isCheckOutClicked: boolean;
  private _isUserSettingClicked: boolean;
  private _isShopInfoClicked: boolean;
  private _isEmployeesinfoClicked: boolean;

  //dynamic settings
  private _visitor: VisitorFacade;
  private _isMemberLoggedIn: boolean;
  private _member: MemberFacade;
  itemSearchResult: ItemFacade[];
  private _selectedShop: ShopFacade;
  constructor() {
    this._visitor = new VisitorFacade();
    this._isMemberLoggedIn = false;
    this._isRegisterClicked = false;
    this._isSearchItemClicked = true;
    // this._isSearchItemClicked = false;
    this._isLoginClicked = false;
    this._isCartInfoClicked = false;
    this._isCheckOutClicked = false;
    this._isUserSettingClicked = false;
    this._isShopInfoClicked = false;
    this._isEmployeesinfoClicked = false;
    this._member = undefined;

    this.selectedShop = undefined;
    this.itemSearchResult = [];
  }

  cleanAllComponents() {
    this._isLoginClicked = false;
    this._isRegisterClicked = false;
    this._isSearchItemClicked = false;
    this._isCartInfoClicked = false;
    this._isCheckOutClicked = false;
    this._isShopInfoClicked = false;
    this._isUserSettingClicked = false;
    this._isEmployeesinfoClicked = false;

  }

  get isEmployeesinfoClicked(): boolean {
    return this._isEmployeesinfoClicked;
  }
  set isEmployeesinfoClicked(value: boolean) {
    this.cleanAllComponents();
    this._isEmployeesinfoClicked = value;
  }


  get isShopInfoClicked(): boolean {
    return this._isShopInfoClicked;
  }
  set isShopInfoClicked(value: boolean) {
    this.cleanAllComponents();
    this._isShopInfoClicked = value;
  }
  get isUserSettingClicked(): boolean {
    return this._isUserSettingClicked;
  }
  set isUserSettingClicked(value: boolean) {
    this.cleanAllComponents();
    this._isUserSettingClicked = value;
  }
  get isCheckOutClicked(): boolean {
    return this._isCheckOutClicked;
  }
  set isCheckOutClicked(value: boolean) {
    this.cleanAllComponents();
    this._isCheckOutClicked = value;
  }
  get isCartInfoClicked(): boolean {
    return this._isCartInfoClicked;
  }
  set isCartInfoClicked(value: boolean) {
    this.cleanAllComponents();
    this._isCartInfoClicked = value;
  }

  get isLoginClicked(): boolean {
    return this._isLoginClicked;
  }
  set isLoginClicked(value: boolean) {
    this.cleanAllComponents();
    this._isLoginClicked = value;
  }

  get isSearchItemClicked(): boolean {
    return this._isSearchItemClicked;
  }
  set isSearchItemClicked(value: boolean) {
    this.cleanAllComponents();
    this._isSearchItemClicked = value;
  }
  get isRegisterClicked(): boolean {
    return this._isRegisterClicked;
  }
  set isRegisterClicked(value: boolean) {
    this.cleanAllComponents();
    this._isRegisterClicked = value;
  }

  get isMemberLoggedIn() {
    return this._isMemberLoggedIn;
  }
  set isMemberLoggedIn(value: boolean) {
    this._isMemberLoggedIn = value;
  }

  get isMarketInitialized() {
    return this._isMarketInitialized;
  }
  set isMarketInitialized(value: boolean) {
    this._isMarketInitialized = value;
  }


  get visitor() {
    return this._visitor;
  }
  set visitor(value: VisitorFacade) {
    this._visitor = value;
  }


  get member() : MemberFacade {
    return this._member;
  }
  set member(value: MemberFacade) {
    this._member = value;
  }
  get selectedShop() : ShopFacade {
    return this._selectedShop;
  }
  set selectedShop(value: ShopFacade) {
    this._selectedShop = value;
  }

}
