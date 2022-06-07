import { Component, OnInit } from '@angular/core';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { ConfigService } from 'app/services/config-service.service';
import { DiscountService } from 'app/services/discount-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';

@Component({
  selector: 'app-new-discount',
  templateUrl: './new-discount.component.html',
  styleUrls: ['./new-discount.component.scss']
})
export class NewDiscountComponent implements OnInit {


  currentDiscounts: DiscountTypeFacade[];
  constructor(
    private engine: EngineService,
    private messageService: MessageService,
    private modelAdapter: ModelAdapterService,
    private discountService: DiscountService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
    this.currentDiscounts =[];
  }


  isDiscountsEmpty(){
    return this.currentDiscounts.length <1;
  }
  addSubDiscount(){
    this.config.isSubDiscountClicked = true;
  }

  mergeDiscounts(){

  }

  backToShop(){

  }

  openDiscountDialog(discount:DiscountTypeFacade){

  }
  getDiscountName(discount:DiscountTypeFacade){

  }

  removeDiscount(discount:DiscountTypeFacade){

  }

  submit(){}

}
