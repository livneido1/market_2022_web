import { Component, OnInit } from '@angular/core';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { ItemLevelStateFacade } from 'app/http/facadeObjects/Discounts/item-level-state-facade';
import { SimpleDiscountFacade } from 'app/http/facadeObjects/Discounts/simple-discount-facade';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';

@Component({
  selector: 'app-discount-main',
  templateUrl: './discount-main.component.html',
  styleUrls: ['./discount-main.component.scss']
})
export class DiscountMainComponent implements OnInit {
  shop: ShopFacade;
  lastUpdate: string;
  currentDiscounts : DiscountTypeFacade[];
  constructor(
    private engine: EngineService,
    private messageService: MessageService,
    private config: ConfigService,
    private modelAdapter: ModelAdapterService
  ) {
  }

  ngOnInit(): void {
    this.currentDiscounts = [];
    this.shop = this.config.selectedShop;
    this.lastUpdate = new Date().toLocaleString();

  }


  openDiscountDialog(discount: DiscountTypeFacade){

  }

  getDiscountName(discount){
    return "name";
  }

  removeDiscount(discount){

  }


  addDiscount(){
    this.config.isAddNewDiscountClicked = true;
  }

  backToShop(){

  }

  reset(){
    this.lastUpdate = new Date().toLocaleString();

  }





}
