import { Component, OnInit } from '@angular/core';
import { Category } from 'app/http/facadeObjects/ItemFacade';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  data = [
    {id: 1, name: 'Milk', email: 10},
    {id:2, name: 'Milka', email: 5.60},
    {id:3, name: 'Coffee', email: 20},
    {id:4, name: 'IPhoneX12', email: 100000},
    {id:5, name: 'Cheese', email: 3},
    {id:5, name: 'water', email: 4},
    {id:5, name: 'Cola', email: 10},
    {id:5, name: 'Salami', email: 15},
    {id:5, name: 'Flour', email: 12},
    {id:5, name: 'Pita', email: 14},

  ];

  constructor() {

  }

  ngOnInit(): void {
  }

}
