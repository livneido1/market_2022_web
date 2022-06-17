import { Component, OnInit } from '@angular/core';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { ItemLevelStateFacade } from 'app/http/facadeObjects/Discounts/item-level-state-facade';
import { SimpleDiscountFacade } from 'app/http/facadeObjects/Discounts/simple-discount-facade';
import { DiscountTypeWrapper } from 'app/http/facadeObjects/Discounts/Wrappers/discount-type-wrapper';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { GetPoliciesRequest } from 'app/http/requests/get-policies-request';
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
    this.reset();
  }

  onMergeDiscountsClick(){
    
  }

  openDiscountDialog(discount: DiscountTypeFacade){

  }

  getDiscountName(discount){
    return "name";
  }

  removeDiscount(discount){

  }




  addDiscount(){
    this.config.isSubDiscountClicked = true;
  }

  backToShop(){

  }

  reset(){
    this.lastUpdate = new Date().toLocaleString();
    const request = new GetPoliciesRequest(this.config.visitor.name, this.config.selectedShop.shopName);
    this.engine.getDiscountTypesOfShop(request).subscribe(responseJson =>{
      const response = new ResponseT<DiscountTypeWrapper[]>().deserialize(responseJson);
      if (response.isErrorOccurred()){
        this.messageService.errorMessage(response.getMessage());
      }
      else{
        if (response.value){
          this.currentDiscounts = response.value;
          this.messageService.validMessage("successfully loaded shop's discounts");
        }
        else{
          this.messageService.errorMessage("somthing went wrong. please restart");
        }
      }

    })
  }





}
