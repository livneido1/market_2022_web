import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
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

  data = [
    { id: 1, name: 'Milk', email: 10 },
    { id: 2, name: 'Milka', email: 5.6 },
    { id: 3, name: 'Coffee', email: 20 },
    { id: 4, name: 'IPhoneX12', email: 100000 },
    { id: 5, name: 'Cheese', email: 3 },
    { id: 5, name: 'water', email: 4 },
    { id: 5, name: 'Cola', email: 10 },
    { id: 5, name: 'Salami', email: 15 },
    { id: 5, name: 'Flour', email: 12 },
    { id: 5, name: 'Pita', email: 14 },
  ];



  shopName: string;

  constructor(
    public dialog: MatDialog,
    private engine: EngineService,
    private config: ConfigService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.shopName = "";
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
  test() {
    let x = 3;
    return 4;
  }
  canSearchShopName(){
    return (this.shopName && this.shopName !== "");
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

  isMemberLoggedin(){
    return this.config.isMemberLoggedIn;
  }
}
