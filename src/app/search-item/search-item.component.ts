import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemToCartDialogComponent } from 'app/add-item-to-cart-dialog/add-item-to-cart-dialog.component';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { ObjectsDeserializer } from 'app/http/facadeObjects/objects-deserializer';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { AddABidRequest } from 'app/http/requests/add-abid-request';
import { AddItemToShoppingCartRequest } from 'app/http/requests/add-item-to-shopping-cart-request';
import { TwoStringRequest } from 'app/http/requests/two-string-request';
import { ItemMatDialogComponent } from 'app/item-mat-dialog/item-mat-dialog.component';
import { BidData, OfferBidDialogComponent } from 'app/offer-bid-dialog/offer-bid-dialog.component';
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
  categoryFilters: string[];
  minPrice: number;
  maxPrice: number;

  constructor(
    public dialog: MatDialog,
    private engine: EngineService,
    private config: ConfigService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.shopName = '';
    this.items = this.config.itemsSearched;
    this.filteredItems = this.items;
    this.categoryFilters = [];
    // this.minPrice = -1;
    // this.maxPrice = -1;
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

  canSearchShopName() {
    return this.shopName && this.shopName !== '';
  }

  getFilteredItems() {
    if (this.config.itemsSearched) {
      let filtered = this.config.itemsSearched;
      filtered = this.filterByCategory(filtered);
      filtered = this.filterByPrice(filtered);
      return filtered;
    }
    return undefined;
  }

  isItemsFound() {
    const items = this.getFilteredItems();
    return items && items.length > 0;
  }

  searchShop() {
    const request = new TwoStringRequest();
    request.name = this.config.visitor.name;
    request.shopName = this.shopName;
    this.engine.getShopInfo(request).subscribe((responseJson) => {
      const response = new ResponseT<ShopFacade>().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        const shop = new ShopFacade().deserialize(response.value);
        this.config.selectedShop = shop;
        this.config.isShopInfoClicked = true;
      }
    });
  }

  addToCart(item: ItemFacade) {
    const dialogRef = this.dialog.open(AddItemToCartDialogComponent, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((amount) => {
      if (!amount){
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

  getNoFoundTitle() {
    if (!this.getFilteredItems()) {
      return '';
    } else {
      return 'No Results Found';
    }
  }

  isMemberLoggedin() {
    return this.config.isMemberLoggedIn;
  }

  filterByPrice(unfiltered: ItemFacade[]) {
    let filtered = unfiltered;
    if (this.minPrice && this.minPrice > 0) {
      filtered = filtered.filter((item) => item.price > this.minPrice);
    }
    if (this.maxPrice && this.maxPrice > 0) {
      filtered = filtered.filter((item) => item.price < this.maxPrice);
    }
    return filtered;
  }

  filterByCategory(unfiltered: ItemFacade[]) {
    if (!this.categoryFilters || this.categoryFilters.length === 0) {
      return unfiltered;
    }
    const filtered = [];
    for (const item of unfiltered) {
      const categoryString = item.getCategoryString();
      if (!this.categoryFilters.includes(categoryString)) {
        filtered.push(item);
      }
    }
    return filtered;
    // return unfiltered.filter((item) => !this.categoryFilters.includes(item.getCategoryString())   )
  }

  getAllCategories() {
    return this.config.getAllCategories();
  }


  changeFilter(checked, category: string) {
    if (!checked) {
      if (!this.categoryFilters.includes(category)) {
        this.categoryFilters.push(category);
      }
    }
    // marked
    else {
      const index = this.categoryFilters.indexOf(category, 0);
      if (index > -1) {
        this.categoryFilters.splice(index, 1);
      }
    }
  }
}
