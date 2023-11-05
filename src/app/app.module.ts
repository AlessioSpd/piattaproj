import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { IDropMenuComponent } from './customWidget/idrop-menu/idrop-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { OrderConfirmModalComponent } from './components/order-confirm-modal/order-confirm-modal.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SearchPageComponent,
    PageHeaderComponent,
    IDropMenuComponent,
    ProductModalComponent,
    LoginPageComponent,
    CartPageComponent,
    OrderConfirmModalComponent,
    AdminPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
