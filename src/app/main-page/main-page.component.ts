import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
  }



  isRegisterClicked(): boolean{
    return this.config.isRegisterClicked;
  }

  isSearchItemClicked() : boolean{
    return this.config.isSearchItemClicked;
  }
  isLoginClicked(): boolean{
    return this.config.isLoginClicked;
  }

  isShoppingCartInfoClicked(){
    return this.config.isCartInfoClicked;
  }

  isCheckoutClicked(){
    return this.config.isCheckOutClicked;
  }

  isUserSettingClicked(){
    return this.config.isUserSettingClicked;
  }

  isShopInfoClicked(){
    return this.config.isShopInfoClicked;
  }
}
