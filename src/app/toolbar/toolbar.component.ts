import { Component, OnInit } from '@angular/core';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { VisitorFacade } from 'app/http/facadeObjects/visitor-facade';
import { EngineService } from 'app/services/engine.service';
import { ConfigService } from '../services/config-service.service';
import { Response } from 'app/http/facadeObjects/response';
import { SearchProductByNameRequest } from 'app/http/requests/search-product-by-name-request';
import { MessageService } from 'app/services/message.service';
import { ItemFacade } from 'app/http/facadeObjects/ItemFacade';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  productSearchBy: string;
  searchText: string;

  constructor(
    private config: ConfigService,
    private engine: EngineService,
    private messageService: MessageService
  ) {
    this.productSearchBy = 'Product Name';
    this.searchText = '';
  }

  ngOnInit(): void {}

  loginClicked(): void {
    this.config.isLoginClicked = true;
  }
  isManagerLoggedIn():boolean{
    return this.config.isManagerLoggedIn;
  }

  managerSettings(){
    this.config.isManagerSettingsClicked = true;
  }

  openUserSettings() {
    this.config.isUserSettingClicked = true;
  }

  shoppingCartInfoClick() {
    this.config.isCartInfoClicked = true;
  }
  searchItem() {
    if (!this.searchText || this.searchText === '') {
      this.config.isSearchItemClicked = true;
    } else {
      switch (this.productSearchBy) {
        case 'Category':
          this.searchByCategory();
          break;
        case 'Keyword':
          this.searchByKeyword();
          break;
        case 'Product Name':
          this.searchByProductName();
          break;
      }
    }
  }

  searchByProductName() {
    const request = new SearchProductByNameRequest();
    request.productName = this.searchText;
    this.engine.searchProductByName(request).subscribe((responseJson) => {
      const response = new ResponseT().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        const items: ItemFacade[] = [];
        for (const item of response.value) {
          items.push(new ItemFacade().deserialize(item));
        }
        this.config.applySearch(items);
        this.messageService.validMessage('result from search returned');
      }
    });
  }
  searchByKeyword() {
    const request = new SearchProductByNameRequest();
    request.productName = this.searchText;
    this.engine.searchProductByKeyword(request).subscribe((responseJson) => {
      const response = new ResponseT().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        const items: ItemFacade[] = [];
        for (const item of response.value) {
          items.push(new ItemFacade().deserialize(item));
        }
        this.config.applySearch(items);
        this.messageService.validMessage('result from search returned');
      }
    });
  }
  searchByCategory() {
    const request = this.config.createCategoryFromString(this.searchText);
    this.engine.searchProductByCategory(request).subscribe((responseJson) => {
      const response = new ResponseT().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        this.messageService.errorMessage(response.getMessage());
      } else {
        const items: ItemFacade[] = [];
        for (const item of response.value) {
          items.push(new ItemFacade().deserialize(item));
        }
        this.config.applySearch(items);
        this.messageService.validMessage('result from search returned');
      }
    });
  }
  typeChanged() {
    this.searchText = '';
  }

  getAllCategories() {
    return this.config.getAllCategories();
  }

  searchByCategoryOn() {
    return this.productSearchBy === 'Category';
  }

  selectCategory(category, event: any) {
    if (event.isUserInput) {
      this.searchText = category;
    }
  }
  goHome(){
    this.config.isSearchItemClicked = true;
  }

  getExample(): string {
    switch (this.productSearchBy) {
      case 'Category':
        return 'Cellular';
        break;
      case 'Keyword':
        return 'Dairy';
        break;
      case 'Product Name':
        return 'Milk';
        break;
    }
    return '';
  }
  searchBy() {}

  register() {
    this.config.isRegisterClicked = true;
  }

  getVisitorName(): string {
    return this.config.visitor.name;
  }

  isMemberLoggedIn(): boolean {
    return this.config.isMemberLoggedIn;
  }
}
