import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from 'app/add-item-dialog/add-item-dialog.component';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { AddItemToShopRequest } from 'app/http/requests/add-item-to-shop-request';
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

  constructor(
    private config: ConfigService,
    private engine: EngineService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.reset();
  }

  openDialog(item: any): void {
    const tempItem: ItemFacade = new ItemFacade();
    tempItem.name = 'OnePlus 10';
    tempItem.price = 50;
    tempItem.info = 'best of all';
    tempItem.id = 1;
    tempItem.category = Category.cellular;
    tempItem.keywords = ['cellular', 'oneplus'];
    tempItem.rank = 4;
    tempItem.rankers = 10;

    const dialogRef = this.dialog.open(ItemMatDialogComponent, {
      width: '250px',
      data: { relatedItem: tempItem },
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
          }
          const newShop = new ShopFacade().deserialize(response.value);
          this.config.selectedShop = newShop;
          this.config.isShopInfoClicked = true;
          this.messageService.validMessage('Item Succesfully Added');
        });
      }
    });
  }

  reset() {
    this.shop = this.config.selectedShop;
    this.itemList = [];
    for (const entry of this.shop.itemMap.entries()) {
      const item = entry[1];
      this.itemList.push(item);
    }
  }
}
