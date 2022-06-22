import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { MemberFacade } from 'app/http/facadeObjects/MemberFacade';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { VisitorFacade } from 'app/http/facadeObjects/visitor-facade';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  //general settings
  private _isMarketInitialized: boolean;
  //component booleans
  private _isRegisterClicked: boolean;
  private _isSearchItemClicked: boolean;
  private _isLoginClicked: boolean;
  private _isCartInfoClicked: boolean;
  private _isCheckOutClicked: boolean;
  private _isUserSettingClicked: boolean;
  private _isShopInfoClicked: boolean;
  private _isEmployeesinfoClicked: boolean;
  private _isMainDiscountClicked: boolean;
  private _isAddNewDiscountClicked: boolean;
  private _isSubDiscountClicked: boolean;
  private _isMainPurcahsePolicyClicked: boolean;
  private _isAddNewPurchasePolicyClicked: boolean;
  private _isSubPurchasePolicyClicked: boolean;
  private _isManagerSettingsClicked: boolean;

  //dynamic settings
  private _visitor: VisitorFacade;
  private _isMemberLoggedIn: boolean;
  private _member: MemberFacade;
  private _isManagerLoggedIn: boolean;
  itemSearchResult: ItemFacade[];

  public serverUrl: string = 'http://localhost:8080';
  public stompClient: RxStomp;

  private _selectedShop: ShopFacade;
  private _itemsSearched: ItemFacade[];
  constructor() {
    this._isMarketInitialized = false;
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
    this._isMainDiscountClicked = false;
    this._isEmployeesinfoClicked = false;
    this._isAddNewDiscountClicked = false;
    this._isSubDiscountClicked = false;
    this._isMainPurcahsePolicyClicked = false;
    this._isAddNewPurchasePolicyClicked = false;
    this._isSubPurchasePolicyClicked = false;
    this._isManagerSettingsClicked = false;

    this._member = undefined;
    this._itemsSearched = undefined;
    this.selectedShop = undefined;
    this._isManagerLoggedIn = false;
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
    this._isMainDiscountClicked = false;
    this._isAddNewDiscountClicked = false;
    this._isSubDiscountClicked = false;
    this._isMainPurcahsePolicyClicked = false;
    this._isAddNewPurchasePolicyClicked = false;
    this._isSubPurchasePolicyClicked = false;
    this._isManagerSettingsClicked = false;
    this._itemsSearched = undefined;
  }

  applySearch(items: ItemFacade[]) {
    this.cleanAllComponents();
    this._itemsSearched = items;
    this._isSearchItemClicked = true;
  }
  get isEmployeesinfoClicked(): boolean {
    return this._isEmployeesinfoClicked;
  }
  set isEmployeesinfoClicked(value: boolean) {
    this.cleanAllComponents();
    this._isEmployeesinfoClicked = value;
  }

  get isMainDiscountClicked(): boolean {
    return this._isMainDiscountClicked;
  }
  set isMainDiscountClicked(value: boolean) {
    this.cleanAllComponents();
    this._isMainDiscountClicked = value;
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
  get isSubDiscountClicked(): boolean {
    return this._isSubDiscountClicked;
  }
  set isSubDiscountClicked(value: boolean) {
    this.cleanAllComponents();
    this._isSubDiscountClicked = value;
  }
  get isMainPurcahsePolicyClicked(): boolean {
    return this._isMainPurcahsePolicyClicked;
  }
  set isMainPurcahsePolicyClicked(value: boolean) {
    this.cleanAllComponents();
    this._isMainPurcahsePolicyClicked = value;
  }
  get isAddNewPurchasePolicyClicked(): boolean {
    return this._isAddNewPurchasePolicyClicked;
  }
  set isAddNewPurchasePolicyClicked(value: boolean) {
    this.cleanAllComponents();
    this._isAddNewPurchasePolicyClicked = value;
  }
  get isSubPurchasePolicyClicked(): boolean {
    return this._isSubPurchasePolicyClicked;
  }
  set isSubPurchasePolicyClicked(value: boolean) {
    this.cleanAllComponents();
    this._isSubPurchasePolicyClicked = value;
  }
  get isManagerSettingsClicked(): boolean {
    return this._isManagerSettingsClicked;
  }
  set isManagerSettingsClicked(value: boolean) {
    this.cleanAllComponents();
    this._isManagerSettingsClicked = value;
  }

  get isAddNewDiscountClicked(): boolean {
    return this._isAddNewDiscountClicked;
  }
  set isAddNewDiscountClicked(value: boolean) {
    this.cleanAllComponents();
    this._isAddNewDiscountClicked = value;
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

  get itemsSearched() {
    return this._itemsSearched;
  }
  set itemsSearched(value: ItemFacade[]) {
    this._itemsSearched = value;
  }
  get isMarketInitialized() {
    return this._isMarketInitialized;
  }
  set isMarketInitialized(value: boolean) {
    this._isMarketInitialized = value;
  }
  get isManagerLoggedIn() {
    return this._isManagerLoggedIn;
  }
  set isManagerLoggedIn(value: boolean) {
    this._isManagerLoggedIn = value;
  }

  get visitor() {
    return this._visitor;
  }
  set visitor(value: VisitorFacade) {
    this._visitor = value;
  }

  get member(): MemberFacade {
    return this._member;
  }
  set member(value: MemberFacade) {
    this._member = value;
  }
  get selectedShop(): ShopFacade {
    return this._selectedShop;
  }
  set selectedShop(value: ShopFacade) {
    this._selectedShop = value;
  }

  createCategoryFromString(name: string): Category {
    switch (name) {
      case 'general':
        return Category.general;
      case 'fruit':
        return Category.fruit;
      case 'cellular':
        return Category.cellular;
      case 'meat':
        return Category.meat;
      case 'electricity':
        return Category.electricity;
    }
    return Category.general;
  }

  getAllCategories(): string[] {
    return ['general', 'fruit', 'cellular', 'meat', 'electricity'];
  }
}
