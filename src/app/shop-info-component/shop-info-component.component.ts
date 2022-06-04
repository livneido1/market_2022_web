import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from 'app/add-item-dialog/add-item-dialog.component';
import { GetStringValueComponent } from 'app/get-string-value/get-string-value.component';
import {
  GetValueDialogComponent,
  GetValueDialogData,
} from 'app/get-value-dialog/get-value-dialog.component';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { AddItemToShopRequest } from 'app/http/requests/add-item-to-shop-request';
import { ChangeShopItemInfoRequest } from 'app/http/requests/change-shop-item-info-request';
import { RemoveItemFromShopRequest } from 'app/http/requests/remove-item-from-shop-request';
import { SetItemCurrentAmountRequest } from 'app/http/requests/set-item-current-amount-request';
import { TwoStringRequest } from 'app/http/requests/two-string-request';
import { ItemMatDialogComponent } from 'app/item-mat-dialog/item-mat-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';

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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.reset();
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
  showDiscounts(){
    this.config.isMainDiscountClicked = true;
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
        this.engine.changeShopItemInfo(request).subscribe(responseJson =>{
            const response = new Response().deserialize(responseJson);
            if (response.isErrorOccurred()){
              this.messageService.errorMessage(response.getMessage());
            }
            else{
              this.messageService.validMessage("item info changed!");
              this.resetShop();
            }
        })
      }
    });
  }

  onEmployeesClick(){
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

  resetShop() {
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
