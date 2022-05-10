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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HttpHeaders , HttpClient} from '@angular/common/http';
import { SearchItemComponent } from './search-item/search-item.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ItemMatDialogComponent } from './item-mat-dialog/item-mat-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    InitMarketComponent,
    ToolbarComponent,
    RegisterComponent,
    SearchItemComponent,
    ItemMatDialogComponent
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
