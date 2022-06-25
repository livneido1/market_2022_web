import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiscountLevelStateFacade } from 'app/http/facadeObjects/Discounts/discount-level-state-facade';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';

import { DiscountTypeWrapper } from 'app/http/facadeObjects/Discounts/Wrappers/discount-type-wrapper';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { GetPoliciesRequest } from 'app/http/requests/get-policies-request';

import { ConfigService } from 'app/services/config-service.service';
import { PoliciesService } from 'app/services/policies-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';
import { RemoveDiscountFromShopRequest } from 'app/http/requests/remove-discount-from-shop-request';
import { Response } from 'app/http/facadeObjects/response';

@Component({
  selector: 'app-discount-main',
  templateUrl: './discount-main.component.html',
  styleUrls: ['./discount-main.component.scss'],
})
export class DiscountMainComponent implements OnInit {
  shop: ShopFacade;
  lastUpdate: string;
  currentDiscounts: DiscountTypeFacade[];
  constructor(
    private engine: EngineService,
    private messageService: MessageService,
    private config: ConfigService,
    private modelAdapter: ModelAdapterService,
    public dialog: MatDialog,
    private policiesService: PoliciesService,
  ) {}

  ngOnInit(): void {
    this.currentDiscounts = [];
    this.shop = this.config.selectedShop;
    this.lastUpdate = new Date().toLocaleString();
    this.reset();
  }


  openDiscountDialog(discount: DiscountTypeFacade) {}

  getDiscountName(discount:DiscountTypeFacade) {
    return this.policiesService.getDiscountName(discount);
  }

  removeDiscount(discount:DiscountTypeFacade) {
    const wrapper = discount.getWrapper();
    const request = new RemoveDiscountFromShopRequest(wrapper,this.shop.shopName, this.config.visitor.name);
    this.engine.removeDiscountFromShop(request).subscribe(responseJson =>{
      const response = new Response().deserialize(responseJson);
      if (response.isErrorOccurred()){
        this.messageService.errorMessage(response.getMessage());
      }
      else {
        this.reset();
        this.messageService.validMessage("discount successfully removed");
      }
    })
  }

  addDiscount() {
    this.policiesService.reset();
    this.config.isAddNewDiscountClicked = true;
  }

  backToShop() {}

  
  isOwnerOrManager(): boolean {
    if (this.shop.employees.has(this.config.visitor.name)) {
      return true;
    }
    return false;
  }

  reset() {
    this.lastUpdate = new Date().toLocaleString();
    const request = new GetPoliciesRequest(
      this.config.visitor.name,
      this.config.selectedShop.shopName
    );
    this.engine.getDiscountTypesOfShop(request).subscribe((responseJson) => {
      const response = new ResponseT<DiscountTypeWrapper[]>().deserialize(
        responseJson
      );
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        const wrappersJsons: DiscountTypeWrapper[] = response.value;
        if (wrappersJsons) {
          this.currentDiscounts = [];
          for (const wrappersJson of wrappersJsons) {
            const wrapper = new DiscountTypeWrapper().deserialize(wrappersJson);
            const discountType = wrapper.getDiscountType();
            this.currentDiscounts.push(discountType);
          }
          this.messageService.validMessage(
            "successfully loaded shop's discounts"
          );
        } else {
          this.messageService.errorMessage(
            'somthing went wrong. please restart'
          );
        }
      }
    });
  }
}
