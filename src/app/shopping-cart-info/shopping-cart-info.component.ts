import { Component, OnInit } from '@angular/core';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { ItemMatDialogComponent } from 'app/item-mat-dialog/item-mat-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from 'app/services/config-service.service';
import { ShoppingCartFacade } from 'app/http/facadeObjects/shopping-cart-facade';
import { ShoppingBasketFacade } from 'app/http/facadeObjects/shopping-basket-facade';
import { RequestVisitorName } from 'app/http/requests/request-visitor-name';
import { EngineService } from 'app/services/engine.service';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-shopping-cart-info',
  templateUrl: './shopping-cart-info.component.html',
  styleUrls: ['./shopping-cart-info.component.scss'],
})
export class ShoppingCartInfoComponent implements OnInit {
  totalPrice: number;
  cart: ShoppingCartFacade;
  itemsInCart: { item: ItemFacade; amount: number }[];
  constructor(
    public dialog: MatDialog,
    private config: ConfigService,
    private engine: EngineService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.resetShoppingCart();
  }

  isItemInCart(){
    if (this.itemsInCart){
      const len  = this.itemsInCart.length;
      return len >0;
    }
    return false;
  }
  resetShoppingCart() {
    const request = new RequestVisitorName();
    request.name = this.config.visitor.name;
    this.engine.showShoppingCart(request).subscribe((responseJson) => {
      const response = new ResponseT<ShoppingCartFacade>().deserialize(
        responseJson
      );
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        this.config.visitor.cart = new ShoppingCartFacade().deserialize(
          response.value
        );
        this.cart = this.config.visitor.cart;
        this.totalPrice = this.cart.price;
        this.itemsInCart = this.getItems();
        this.messageService.validMessage("successfully loaded cart");
      }
    });
  }

  getItems(): { item: ItemFacade; amount: number }[] {
    const baskets: ShoppingBasketFacade[] = Array.from(this.cart.cart.values());
    const itemsAndAmount: { item: ItemFacade; amount: number }[] = [];
    for (const basket of baskets) {
      for (const entry of basket.itemMap.entries()) {
        const id = entry[0];
        const item = entry[1];
        const amount = basket.items.get(id);
        const itemAndAmount = {
          item: item,
          amount: amount,
        };
        itemsAndAmount.push(itemAndAmount);
      }
    }

    return itemsAndAmount;
  }

  canCheckOut(): boolean {
    return false;
  }

  checkOutClicked() {
    this.config.isCheckOutClicked = true;
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
}
