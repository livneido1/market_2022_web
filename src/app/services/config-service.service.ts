import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _isMarketInitialized:boolean = true;
  private _isRegisterClicked: boolean ;
  private _marketName: string;
  private _memberName: string;
  private _isMemberLoggedIn: boolean;


  constructor() {
    this._marketName="test";
    this._memberName = "Shaked";
    this._isMemberLoggedIn = false;
    this._isRegisterClicked = false;
  }



  cleanAllComponents(){
    this._isRegisterClicked = false;

  }

  get isRegisterClicked(): boolean{
    return this._isRegisterClicked;
  }
  set isRegisterClicked(value :boolean){
    this.cleanAllComponents();
    this._isRegisterClicked=value;
  }

  get isMemberLoggedIn(){
    return this._isMemberLoggedIn;
  }
  set isMemberLoggedIn(value :boolean){
    this._isMemberLoggedIn=value;
  }


  get isMarketInitialized(){
    return this._isMarketInitialized;
  }
  set isMarketInitialized(value :boolean){
    this._isMarketInitialized=value;
  }


  set memberName(value : string) {
    this._memberName = value;
  }
  get memberName():string {
    return this._memberName;
  }

  get marketName() {
    return this._marketName;
  }
  set marketName(value : string) {
    this._marketName = value;
  }
}
