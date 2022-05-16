import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { InitMarketComponent } from './init-market/init-market.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HttpHeaders , HttpClient} from '@angular/common/http';
import { SearchItemComponent } from './search-item/search-item.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ItemMatDialogComponent } from './item-mat-dialog/item-mat-dialog.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ShoppingCartInfoComponent } from './shopping-cart-info/shopping-cart-info.component';
import { CheckOutComponentComponent } from './check-out-component/check-out-component.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ShopInfoComponentComponent } from './shop-info-component/shop-info-component.component';
import { EmployeesComponentComponent } from './employees-component/employees-component.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { OpenNewShopDialogComponent } from './open-new-shop-dialog/open-new-shop-dialog.component';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    InitMarketComponent,
    ToolbarComponent,
    RegisterComponent,
    SearchItemComponent,
    ItemMatDialogComponent,
    LoginComponentComponent,
    ShoppingCartInfoComponent,
    CheckOutComponentComponent,
    UserSettingsComponent,
    ShopInfoComponentComponent,
    EmployeesComponentComponent,
    OpenNewShopDialogComponent,
    AddItemDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    BrowserModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,


  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
