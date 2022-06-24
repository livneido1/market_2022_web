import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';


export interface BidData{
  visitorName:string;
  item: ItemFacade;
  amount:number;
  price:number;
  editable:boolean;
  buttonTitle: string
}
@Component({
  selector: 'app-offer-bid-dialog',
  templateUrl: './offer-bid-dialog.component.html',
  styleUrls: ['./offer-bid-dialog.component.scss']
})
export class OfferBidDialogComponent implements OnInit {
  visitorName:string;
  item: ItemFacade;
  amount:number;
  price:number;
  editable:boolean;
  buttonTitle:string;
  constructor(
    public dialogRef: MatDialogRef<OfferBidDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BidData,
    private config: ConfigService,
    private message: MessageService) {
      this.visitorName = data.visitorName;
      this.item = data.item;
      this.amount = data.amount;
      this.price = data.price;
      this.editable = data.editable;
      this.buttonTitle = data.buttonTitle;
     }

  ngOnInit(): void {
  }

  submit(){
    const data : BidData = {
      visitorName: this.config.visitor.name,
      item: this.item,
      amount: this.amount,
      price: this.price,
      editable: true,
      buttonTitle : ""
    }
    return data;
  }
  canSubmit():boolean{
    return (this.amount && this.amount >0 &&
      this.price && (!(this.price < 0) ) && this.editable )
  }

}
