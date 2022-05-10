import { Component, OnInit } from '@angular/core';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { ItemMatDialogComponent } from 'app/item-mat-dialog/item-mat-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from 'app/services/config-service.service';


@Component({
  selector: 'app-shopping-cart-info',
  templateUrl: './shopping-cart-info.component.html',
  styleUrls: ['./shopping-cart-info.component.scss']
})
export class ShoppingCartInfoComponent implements OnInit {


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

  totalPrice = 100;
  constructor(
    public dialog: MatDialog,
    private config: ConfigService) {}

  ngOnInit(): void {
  }

  canCheckOut():boolean{
    return false;
  }

  checkOutClicked(){
    this.config.isCheckOutClicked=true;
  }
  openDialog(item : any): void {
    const tempItem: ItemFacade = new ItemFacade();
    tempItem.name = "OnePlus 10";
    tempItem.price = 50;
    tempItem.info = "best of all";
    tempItem.ID = 1;
    tempItem.category = Category.cellular;
    tempItem.keywords = ["cellular" , "oneplus"];
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
