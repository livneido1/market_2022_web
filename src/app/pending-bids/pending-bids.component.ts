import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetValueDialogComponent } from 'app/get-value-dialog/get-value-dialog.component';
import { BidFacade } from 'app/http/facadeObjects/bid-facade';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { ApproveABidRequest } from 'app/http/requests/approve-abid-request';
import { RejectABidRequest } from 'app/http/requests/reject-abid-request';
import { SuggestNewOfferToBidRequest } from 'app/http/requests/suggest-new-offer-to-bid-request';
import { TwoStringRequest } from 'app/http/requests/two-string-request';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-pending-bids',
  templateUrl: './pending-bids.component.html',
  styleUrls: ['./pending-bids.component.scss'],
})
export class PendingBidsComponent implements OnInit {
  myPendingBids: BidFacade[];
  constructor(
    private config: ConfigService,
    private engine: EngineService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reset();
  }

  approveBid(bid: BidFacade) {
    const request = new ApproveABidRequest(
      this.config.visitor.name,
      this.config.selectedShop.shopName,
      bid.buyerName,
      bid.itemId
    );
    this.engine.approveABid(request).subscribe(responseJson=>{
      const response = new Response().deserialize(responseJson);
      if (response.isErrorOccurred()){
        this.messageService.errorMessage(response.getMessage());
      }
      else{
        this.messageService.validMessage("successfuly approved");
        this.reset();
      }
    })
  }

  rejectBid(bid: BidFacade) {
    const request = new RejectABidRequest(
      this.config.visitor.name,
      bid.buyerName,
      this.config.selectedShop.shopName,
      bid.itemId
    );
    this.engine.rejectABid(request).subscribe(responseJson=>{
      const response = new Response().deserialize(responseJson);
      if (response.isErrorOccurred()){
        this.messageService.errorMessage(response.getMessage());
      }
      else{
        this.messageService.validMessage("successfuly rejected");
        this.reset();
      }
    })
  }
  setNewOffer(bid: BidFacade) {
    const dialogRef = this.dialog.open(GetValueDialogComponent, {
      width: '500px',
      data:  {title: "new price",
              buttonText:"offer"},
    });

    dialogRef.afterClosed().subscribe(price=>{
      if (!price){
        return;
      }
      const request = new SuggestNewOfferToBidRequest(
        this.config.selectedShop.shopName,
        this.config.visitor.name,
        bid.buyerName,
        bid.itemId,
        price
      );
      this.engine.suggestNewOfferToBid(request).subscribe(responseJson=>{
        const response = new Response().deserialize(responseJson);
        if (response.isErrorOccurred()){
          this.messageService.errorMessage(response.getMessage());
        }
        else{
          this.messageService.validMessage("new offer sent!");
          this.reset();
        }
      })
    })
  }
  hasPendingBids() {
    if (this.myPendingBids && this.myPendingBids.length > 0) {
      return true;
    }
    return false;
  }

  extractMyBids() {
    const bids: BidFacade[] = this.config.selectedShop.bidsInShop;
    this.myPendingBids = [];
    for (const bid of bids) {
      if (bid.shopOwnersStatus.has(this.config.visitor.name) && !bid.shopOwnersStatus.get(this.config.visitor.name)) {
        this.myPendingBids.push(bid);
      }
    }
  }


  resetShop() {
    const request = new TwoStringRequest();
    request.name = this.config.visitor.name;
    request.shopName = this.config.selectedShop.shopName;
    this.engine.getShopInfo(request).subscribe((responseJson) => {
      const response = new ResponseT<ShopFacade>().deserialize(responseJson);
      if (response.isErrorOccurred()) {

      } else {
        const shop = new ShopFacade().deserialize(response.value);
        this.config.selectedShop = shop;
      }
    });
  }

  reset(){
    this.resetShop();
    this.extractMyBids();
  }
}
