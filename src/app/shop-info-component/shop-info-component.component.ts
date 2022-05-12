import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { ItemMatDialogComponent } from 'app/item-mat-dialog/item-mat-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';

@Component({
  selector: 'app-shop-info-component',
  templateUrl: './shop-info-component.component.html',
  styleUrls: ['./shop-info-component.component.scss']
})
export class ShopInfoComponentComponent implements OnInit {


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

  constructor(
    private config: ConfigService,
    private engine: EngineService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
  }

  openDialog(item : any): void {
    const tempItem: ItemFacade = new ItemFacade();
    tempItem.name = "OnePlus 10";
    tempItem.price = 50;
    tempItem.info = "best of all";
    tempItem.id = 1;
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
