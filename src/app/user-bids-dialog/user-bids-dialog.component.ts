import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BidFacade } from 'app/http/facadeObjects/bid-facade';
import { ConfigService } from 'app/services/config-service.service';
import { MessageService } from 'app/services/message.service';
export interface UserBidsData{
  bids: BidFacade[]
}
@Component({
  selector: 'app-user-bids-dialog',
  templateUrl: './user-bids-dialog.component.html',
  styleUrls: ['./user-bids-dialog.component.scss']
})
export class UserBidsDialogComponent implements OnInit {
  bids: BidFacade[]
  constructor(
    public dialogRef: MatDialogRef<UserBidsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserBidsData,
    private config: ConfigService,
    private message: MessageService
  ) {
    this.bids = data.bids;
   }

  ngOnInit(): void {
  }

  hasPendingBids() {
    if (this.bids && this.bids.length > 0) {
      return true;
    }
    return false;
  }
}
