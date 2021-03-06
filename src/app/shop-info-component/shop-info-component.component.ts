import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from 'app/add-item-dialog/add-item-dialog.component';
import {
  ApprovePendingAppsDialogComponent,
  PendingAppsData,
  PendingAppsReturnValue,
} from 'app/approve-pending-apps-dialog/approve-pending-apps-dialog.component';
import { AddItemToCartDialogComponent } from 'app/add-item-to-cart-dialog/add-item-to-cart-dialog.component';
import { GetStringValueComponent } from 'app/get-string-value/get-string-value.component';
import {
  GetValueDialogComponent,
  GetValueDialogData,
} from 'app/get-value-dialog/get-value-dialog.component';
import { AppointmentFacade } from 'app/http/facadeObjects/AppointmentFacade';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { PermissionFacade } from 'app/http/facadeObjects/PermissionFacade';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { AddABidRequest } from 'app/http/requests/add-abid-request';
import { AddItemToShopRequest } from 'app/http/requests/add-item-to-shop-request';
import { ApproveAppointmentRequest } from 'app/http/requests/approve-appointment-request';
import { AddItemToShoppingCartRequest } from 'app/http/requests/add-item-to-shopping-cart-request';
import { ChangeShopItemInfoRequest } from 'app/http/requests/change-shop-item-info-request';
import { CloseShopRequest } from 'app/http/requests/close-shop-request';
import { MyPendingAppsRequest } from 'app/http/requests/my-pending-apps-request';
import { RemoveItemFromShopRequest } from 'app/http/requests/remove-item-from-shop-request';
import { SetItemCurrentAmountRequest } from 'app/http/requests/set-item-current-amount-request';
import { TwoStringRequest } from 'app/http/requests/two-string-request';
import { ItemMatDialogComponent } from 'app/item-mat-dialog/item-mat-dialog.component';
import {
  BidData,
  OfferBidDialogComponent,
} from 'app/offer-bid-dialog/offer-bid-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import {
  ShopPurchaseHistoryData,
  ShopPurchaseHistoryDialogComponent,
} from 'app/shop-purchase-history-dialog/shop-purchase-history-dialog.component';
import { ModelAdapterService } from 'app/services/model-adapter.service';

@Component({
  selector: 'app-shop-info-component',
  templateUrl: './shop-info-component.component.html',
  styleUrls: ['./shop-info-component.component.scss'],
})
export class ShopInfoComponentComponent implements OnInit {
  shop: ShopFacade;
  itemList: ItemFacade[];
  lastUpdate: string;
  constructor(
    private config: ConfigService,
    private engine: EngineService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private modelAdapter: ModelAdapterService
  ) {}

  ngOnInit(): void {
    this.resetShop();
  }

  openDialog(item: ItemFacade): void {
    const amount = this.shop.itemsCurrentAmount.get(item.id);
    const dialogRef = this.dialog.open(ItemMatDialogComponent, {
      width: '250px',
      data: { relatedItem: item, amount: amount },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  showItems() {
    return this.itemList.length > 0;
  }

  addItemToShop() {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((returnedData) => {
      if (returnedData) {
        const request = new AddItemToShopRequest();
        request.name = returnedData.name;
        request.info = returnedData.info;
        request.price = returnedData.price;
        request.category = returnedData.category;
        request.amount = 0;
        request.shopName = this.shop.shopName;
        request.shopOwnerName = this.config.visitor.name;
        request.keywords = returnedData.keywords;
        this.engine.addItemToShop(request).subscribe((responseJson) => {
          const response = new ResponseT().deserialize(responseJson);
          if (response.isErrorOccurred()) {
            this.messageService.errorMessage(response.getMessage());
          } else {
            const newShop = new ShopFacade().deserialize(response.value);
            this.config.selectedShop = newShop;
            this.config.isShopInfoClicked = true;
            this.reset();
            this.messageService.validMessage('Item Succesfully Added');
          }
        });
      }
    });
  }

  removeItem(item: ItemFacade) {
    const request = new RemoveItemFromShopRequest(
      this.config.visitor.name,
      item,
      this.shop.shopName
    );
    this.engine.removeItemFromShop(request).subscribe((responseJson) => {
      const response: Response = new Response().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        this.messageService.validMessage('item successfully removed!');
        this.resetShop();
      }
    });
  }

  setItemAmount(item: ItemFacade) {
    const data: GetValueDialogData = {
      title: 'Choose new Amount',
      buttonText: 'Set new Amount!',
    };
    const dialogRef = this.dialog.open(GetValueDialogComponent, {
      width: '250px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((amount) => {
      if (!amount) {
        return;
      }
      const request = new SetItemCurrentAmountRequest(
        this.config.visitor.name,
        item,
        amount,
        this.shop.shopName
      );
      this.engine.updateShopItemAmount(request).subscribe((responseJson) => {
        const response = new Response().deserialize(responseJson);
        if (response.isErrorOccurred()) {
          this.messageService.errorMessage(response.getMessage());
        } else {
          this.messageService.validMessage('item amount successfully updated!');
          this.resetShop();
        }
      });
    });
  }
  showDiscounts() {
    this.config.isMainDiscountClicked = true;
  }
  onPurchasePoliciesClick() {
    this.config.isMainPurcahsePolicyClicked = true;
  }
  getItemCurrentAmount(item: ItemFacade) {
    const amount = this.shop.itemsCurrentAmount.get(item.id);
    return amount;
  }

  setItemInfo(item: ItemFacade) {
    const data: GetValueDialogData = {
      title: 'set new info',
      buttonText: 'Set Info!',
    };
    const dialogRef = this.dialog.open(GetStringValueComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((info) => {
      if (info) {
        const request = new ChangeShopItemInfoRequest(
          this.config.visitor.name,
          info,
          item,
          this.shop.shopName
        );
        this.engine.changeShopItemInfo(request).subscribe((responseJson) => {
          const response = new Response().deserialize(responseJson);
          if (response.isErrorOccurred()) {
            this.messageService.errorMessage(response.getMessage());
          } else {
            this.messageService.validMessage('item info changed!');
            this.resetShop();
          }
        });
      }
    });
  }

  onEmployeesClick() {
    this.config.isEmployeesinfoClicked = true;
  }

  reset() {
    this.shop = this.config.selectedShop;
    this.itemList = [];
    for (const entry of this.shop.itemMap.entries()) {
      const item = entry[1];
      this.itemList.push(item);
    }
    this.lastUpdate = new Date().toLocaleString();
  }

  showPurchaseHistory() {
    const request = new TwoStringRequest(
      this.config.visitor.name,
      this.shop.shopName
    );
    this.engine.getShopPurchaseHistory(request).subscribe((responseJson) => {
      const response = new ResponseT<string>().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
        return;
      } else {
        const history: string = response.value;
        const data: ShopPurchaseHistoryData = { history: history };
        const dialogRef = this.dialog.open(ShopPurchaseHistoryDialogComponent, {
          width: '500px',
          data: data,
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
        });
      }
    });
  }
  getMyPendingApps() {
    const request = new MyPendingAppsRequest(
      this.shop.shopName,
      this.config.visitor.name
    );
    this.engine.getMyPendingApps(request).subscribe((responseJson) => {
      const response = new ResponseT<string>().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
        return;
      }
      const names: string[] = response.value;
      if (!names || names.length < 1) {
        this.messageService.validMessage('you have no pending apppointments');
      } else {
        const data: PendingAppsData = {
          names: names,
        };
        const dialogRef = this.dialog.open(ApprovePendingAppsDialogComponent, {
          width: '500px',
          data: data,
        });
        dialogRef.afterClosed().subscribe((data: PendingAppsReturnValue) => {
          this.approveOrRejectBatch(data);
        });
      }
    });
  }
  // TODO create method on server side
  approveOrRejectBatch(data: PendingAppsReturnValue) {
    for (const memberName of data.checked) {
      this.approveRejectAppointment(memberName, data.approve);
    }
  }

  private approveRejectAppointment(memberName: string, approve: boolean) {
    const request = new ApproveAppointmentRequest(
      this.shop.shopName,
      memberName,
      this.config.visitor.name
    );
    if (approve) {
      this.engine.approveAppointment(request).subscribe((responseJson) => {
        const response = new Response().deserialize(responseJson);
        if (response.isErrorOccurred()) {
          this.messageService.errorMessage(response.getMessage());
        } else {
          this.messageService.validMessage('successfully done');
          // TODO doesnt need to reset after each approve
          this.resetShop();
        }
      });
    }
  }

  closeShop() {
    const request = new CloseShopRequest(
      this.config.visitor.name,
      this.shop.shopName
    );
    this.engine.closeShop(request).subscribe((responseJson) => {
      const response = new Response().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        this.messageService.validMessage(
          'shop succefully removed!, to re open it, go to member settings'
        );
        this.config.isSearchItemClicked = true;
      }
    });
  }

  showPendingBidsToApprove() {
    this.config.isPendingBidsClicked = true;
  }
  offerBid(item: ItemFacade) {
    const data: BidData = {
      visitorName: this.config.visitor.name,
      item: item,
      amount: 0,
      price: 0,
      editable: true,
      buttonTitle: 'submit an offer!',
    };
    const dialogRef = this.dialog.open(OfferBidDialogComponent, {
      width: '250px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((data: BidData) => {
      if (data) {
        const request = new AddABidRequest(
          data.visitorName,
          this.shop.shopName,
          item.id,
          data.price,
          data.amount
        );
        this.engine.addABid(request).subscribe((responseJson) => {
          const response = new Response().deserialize(responseJson);
          if (response.isErrorOccurred()) {
            this.messageService.errorMessage(response.getMessage());
          } else {
            this.messageService.validMessage('bid succesfully offered');
            this.resetShop();
          }
        });
      }
    });
  }

  hasHistoryPermission(): boolean {
    return this.modelAdapter.hasPermission(
      this.shop,
      this.config.visitor.name,
      'PurchaseHistoryPermission'
    );
  }
  hasBidPermissions(): boolean {
    return this.modelAdapter.hasPermission(
      this.shop,
      this.config.visitor.name,
      'ApproveBidPermission'
    );
  }
  hasInventoryPermission(): boolean {
    return this.modelAdapter.hasPermission(
      this.shop,
      this.config.visitor.name,
      'EditInventoryPermission'
    );
  }
  hasEmployeePermission(): boolean {
    return this.modelAdapter.hasPermission(
      this.shop,
      this.config.visitor.name,
      'EmployeesPermission'
    );
  }
  isFounder(): boolean {
    if (this.shop.employees.has(this.config.visitor.name)) {
      const app: AppointmentFacade = this.shop.employees.get(
        this.config.visitor.name
      );
      if (!app.superVisor) {
        return true;
      }
    }
    return false;
  }

  addToCart(item: ItemFacade) {
    const dialogRef = this.dialog.open(AddItemToCartDialogComponent, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((amount) => {
      if (!amount) {
        return;
      }
      const request = new AddItemToShoppingCartRequest();
      request.amount = amount;
      request.itemToInsert = item;
      request.visitorName = this.config.visitor.name;
      this.engine.addItemToShoppingCart(request).subscribe((responseJson) => {
        const response = new Response().deserialize(responseJson);
        if (response.isErrorOccurred()) {
          this.messageService.errorMessage(response.getMessage());
        } else {
          this.messageService.validMessage('Item Successfully added');
        }
      });
    });
  }

  resetShop() {
    this.reset();
    const request = new TwoStringRequest();
    request.name = this.config.visitor.name;
    request.shopName = this.shop.shopName;
    this.engine.getShopInfo(request).subscribe((responseJson) => {
      const response = new ResponseT<ShopFacade>().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(
          'sorry, error accoured, please exit and enter shop'
        );
      } else {
        const shop = new ShopFacade().deserialize(response.value);
        this.config.selectedShop = shop;
        this.reset();
      }
    });
  }
}
