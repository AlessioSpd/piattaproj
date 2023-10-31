import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';

const routes: Routes = [
  { path:'', component: LandingPageComponent },
  { path:'search', component: SearchPageComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'cart', component: CartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
