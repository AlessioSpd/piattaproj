import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AuthGuard } from './utility/app.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [AuthGuard], data: { roles: ['user'] }},
  { path:'search', component: SearchPageComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard], data: { roles: ['user'] } } ,
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
