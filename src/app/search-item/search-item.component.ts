import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemToCartDialogComponent } from 'app/add-item-to-cart-dialog/add-item-to-cart-dialog.component';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { AddItemToShoppingCartRequest } from 'app/http/requests/add-item-to-shopping-cart-request';
import { TwoStringRequest } from 'app/http/requests/two-string-request';
import { ItemMatDialogComponent } from 'app/item-mat-dialog/item-mat-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {




  items: ItemFacade[];
  filteredItems: ItemFacade[];
  shopName: string;

  constructor(
    public dialog: MatDialog,
    private engine: EngineService,
    private config: ConfigService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.shopName = "";
    this.items =  this.config.itemsSearched;
    this.filteredItems = this.items;
  }
  openDialog(item: ItemFacade): void {

    const dialogRef = this.dialog.open(ItemMatDialogComponent, {
      width: '250px',
      data: { relatedItem: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  test() {
    let x = 3;
    return 4;
  }
  canSearchShopName(){
    return (this.shopName && this.shopName !== "");
  }

  getFilteredItems(){
    if(this.config.itemsSearched){
      return this.config.itemsSearched;
    }
    return undefined;
  }

  isItemsFound(){
    const items = this.getFilteredItems();
    return items && (items.length > 0);

  }

  searchShop() {
    const request =  new TwoStringRequest();
    request.name = this.config.visitor.name;
    request.shopName = this.shopName;
    this.engine.getShopInfo(request).subscribe(responseJson =>{
      const response = new ResponseT<ShopFacade>().deserialize(responseJson);
      if (response.isErrorOccurred()){
        this.messageService.errorMessage(response.getMessage());
      }
      else{
        const shop =  new ShopFacade().deserialize(response.value);
        this.config.selectedShop = shop;
        this.config.isShopInfoClicked = true;
      }
    })
  }

  addToCart(item:ItemFacade){
    const dialogRef = this.dialog.open(AddItemToCartDialogComponent, {
      width: '300px',
      data: { },
    });

    dialogRef.afterClosed().subscribe((amount) => {
      const request = new AddItemToShoppingCartRequest();
      request.amount = amount;
      request.itemToInsert = item;
      request.visitorName = this.config.visitor.name;
      this.engine.addItemToShoppingCart(request).subscribe(responseJson => {
        const response = new Response().deserialize(responseJson);
        if (response.isErrorOccurred()){
          this.messageService.errorMessage(response.getMessage());
        }
        else{
          this.messageService.validMessage("Item Successfully added");
        }
      })
    });

  }

  getNoFoundTitle(){
    if (!this.getFilteredItems()){
      return ""
    }
    else{
      return "No Results Found";
    }
  }

  isMemberLoggedin(){
    return this.config.isMemberLoggedIn;
  }
}
