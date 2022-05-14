import { Component, OnInit } from '@angular/core';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { VisitorFacade } from 'app/http/facadeObjects/visitor-facade';
import { EngineService } from 'app/services/engine.service';
import { ConfigService } from '../services/config-service.service';
import { Response } from 'app/http/facadeObjects/response';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  productSearchBy: string;
  search_argument: string;

  constructor(private config: ConfigService, private engine: EngineService) {
    this.productSearchBy = 'Product Name';
    this.search_argument = '';
  }

  ngOnInit(): void {}

  loginClicked(): void {
    this.config.isLoginClicked =true;
  }

  openUserSettings(){
    this.config.isUserSettingClicked = true;
  }

  shoppingCartInfoClick(){
    this.config.isCartInfoClicked = true;
  }
  searchItem() {
    this.config.isSearchItemClicked=true;
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

  searchByProductName() {}
  searchByKeyword() {}
  searchByCategory() {
    this.engine.guestLogin().subscribe((response: ResponseT<VisitorFacade>) => {

        const visitor: VisitorFacade = new VisitorFacade().deserialize(
          response.value
        );

        const n = visitor.name;
        // this.config.marketName = n;

    });
  }

  getExample(): string{
    switch (this.productSearchBy) {
      case 'Category':
        return "Cellular";
        break;
      case 'Keyword':
        return "Dairy";
        break;
      case 'Product Name':
        return "Milk"
        break;
    }
    return "";
  }
  searchBy() {}

  register() {
    this.config.isRegisterClicked = true;
  }

  getVisitorName():string  {
    return this.config.visitor.name;
  }

  isMemberLoggedIn(): boolean {
    return this.config.isMemberLoggedIn;
  }
}
