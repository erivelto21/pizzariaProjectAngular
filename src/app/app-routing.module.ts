import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AuthGuard } from './services/auth-guard.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderListComponent } from './order-list/order-list.component';
import { EditPizzaComponent } from './edit-pizza/edit-pizza.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { SystemUserDataComponent } from './system-user-data/system-user-data.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'register', component: UserRegisterComponent, canActivate: [AuthGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  { path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard]},
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard]},
  { path: 'favorites', component: FavoriteListComponent, canActivate: [AuthGuard]},
  { path: 'edit', component: EditPizzaComponent, canActivate: [AuthGuard]},
  { path: 'mydata', component: SystemUserDataComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
