import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';
import { PoliciesService } from 'app/services/policies-service.service';
import { PurchasePolicyTypeFacade } from 'app/http/facadeObjects/Discounts/purchase-policy-type-facade';
import { EngineService } from 'app/services/engine.service';
import { GetPoliciesRequest } from 'app/http/requests/get-policies-request';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { PurchasePolicyTypeWrapper } from 'app/http/facadeObjects/Discounts/Wrappers/purchase-policy-type-wrapper';
import { RemovePurchasePolicyFromShopRequest } from 'app/http/requests/remove-purchase-policy-from-shop-request';
import { Response } from 'app/http/facadeObjects/response';

@Component({
  selector: 'app-main-shop-purchase-policies',
  templateUrl: './main-shop-purchase-policies.component.html',
  styleUrls: ['./main-shop-purchase-policies.component.scss']
})
export class MainShopPurchasePoliciesComponent implements OnInit {

  shop: ShopFacade;
  lastUpdate: string;
  currentPolicies: PurchasePolicyTypeFacade[];

  constructor(
    private engine: EngineService,
    private messageService: MessageService,
    private config: ConfigService,
    private modelAdapter: ModelAdapterService,
    public dialog: MatDialog,
    private policiesService: PoliciesService,
  ) { }

  ngOnInit(): void {
    this.currentPolicies = [];
    this.shop = this.config.selectedShop;
    this.lastUpdate = new Date().toLocaleString();
    this.reset();
  }
  openPurchasePolicyDialog(purchasePolicy: PurchasePolicyTypeFacade) {}

  getPurchasePolicyName(purchasePolicy:PurchasePolicyTypeFacade) {
    return this.policiesService.getPurchasePolicyName(purchasePolicy);
  }
  
  removePolicy(purchasePolicy:PurchasePolicyTypeFacade ) {
    const wrapper = purchasePolicy.getWrapper();
    const request = new RemovePurchasePolicyFromShopRequest(wrapper,this.shop.shopName, this.config.visitor.name);
    this.engine.removePurchasePolicyFromShop(request).subscribe(responseJson =>{
      const response = new Response().deserialize(responseJson);
      if (response.isErrorOccurred()){
        this.messageService.errorMessage(response.getMessage());
      }
      else {
        this.reset();
        this.messageService.validMessage("policy successfully removed");
      }
    })
  }

  addPolicy() {
    this.policiesService.reset();
    this.config.isAddNewPurchasePolicyClicked = true;
  }
  // TODO
  backToShop() {}

  reset() {
    this.lastUpdate = new Date().toLocaleString();
    const request = new GetPoliciesRequest(
      this.config.visitor.name,
      this.config.selectedShop.shopName
    );
    this.engine.getPurchasePoliciesOfShop(request).subscribe((responseJson) => {
      const response = new ResponseT<PurchasePolicyTypeFacade[]>().deserialize(
        responseJson
      );
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        const wrappersJsons: PurchasePolicyTypeWrapper[] = response.value;
        if (wrappersJsons) {
          this.currentPolicies = [];
          for (const wrappersJson of wrappersJsons) {
            const wrapper = new PurchasePolicyTypeWrapper().deserialize(wrappersJson);
            const purchasePolicy = wrapper.getPurchasePolicyType();
            this.currentPolicies.push(purchasePolicy);
          }
          this.messageService.validMessage(
            "successfully loaded shop's policies"
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
