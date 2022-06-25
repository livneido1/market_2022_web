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
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { AddItemToCartDialogComponent } from './add-item-to-cart-dialog/add-item-to-cart-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { GetValueDialogComponent } from './get-value-dialog/get-value-dialog.component';
import { GetStringValueComponent } from './get-string-value/get-string-value.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { DiscountMainComponent } from './discount-main/discount-main.component';
import { NewDiscountComponent } from './new-discount/new-discount.component';
import { SubDiscountComponent } from './sub-discount/sub-discount.component';
import { AddLevelDialogComponent } from './add-level-dialog/add-level-dialog.component';
import { AddConditionDialogComponent } from './add-condition-dialog/add-condition-dialog.component';
import { MergeLevelDialogComponent } from './merge-level-dialog/merge-level-dialog.component';
import { MergeConditionComponent } from './merge-condition/merge-condition.component';
import { MergeDiscountsDialogComponent } from './merge-discounts-dialog/merge-discounts-dialog.component';
import { MainShopPurchasePoliciesComponent } from './main-shop-purchase-policies/main-shop-purchase-policies.component';
import { AddNewPurchasePolicyComponent } from './add-new-purchase-policy/add-new-purchase-policy.component';
import { SubPurchasePolicyComponent } from './sub-purchase-policy/sub-purchase-policy.component';
import { MergePurchasePoliciesComponent } from './merge-purchase-policies/merge-purchase-policies.component';
import { AddPurchaseLevelDialogComponent } from './add-purchase-level-dialog/add-purchase-level-dialog.component';
import { MergePurchaseLevelDialigComponent } from './merge-purchase-level-dialig/merge-purchase-level-dialig.component';
import { ShopPurchaseHistoryDialogComponent } from './shop-purchase-history-dialog/shop-purchase-history-dialog.component';
import { ManagerSettingsComponent } from './manager-settings/manager-settings.component';
import { OpenNewShopDialogComponent } from './open-new-shop-dialog/open-new-shop-dialog.component';
import { ApprovePendingAppsDialogComponent } from './approve-pending-apps-dialog/approve-pending-apps-dialog.component';
import { OfferBidDialogComponent } from './offer-bid-dialog/offer-bid-dialog.component';
import { PendingBidsComponent } from './pending-bids/pending-bids.component';
import { UserBidsDialogComponent } from './user-bids-dialog/user-bids-dialog.component';
import { ShowTextDialogComponent } from './show-text-dialog/show-text-dialog.component';

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
    AddItemDialogComponent,
    AddItemToCartDialogComponent,
    GetValueDialogComponent,
    GetStringValueComponent,
    EmployeeInfoComponent,
    DiscountMainComponent,
    NewDiscountComponent,
    SubDiscountComponent,
    AddLevelDialogComponent,
    AddConditionDialogComponent,
    MergeLevelDialogComponent,
    MergeConditionComponent,
    MergeDiscountsDialogComponent,
    MainShopPurchasePoliciesComponent,
    AddNewPurchasePolicyComponent,
    SubPurchasePolicyComponent,
    MergePurchasePoliciesComponent,
    AddPurchaseLevelDialogComponent,
    MergePurchaseLevelDialigComponent,
    ShopPurchaseHistoryDialogComponent,
    ManagerSettingsComponent,
    OfferBidDialogComponent,
    UserBidsDialogComponent,
    PendingBidsComponent,
    ApprovePendingAppsDialogComponent,
    ShowTextDialogComponent
  ],
  imports: [
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
    MatDatepickerModule,



  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
