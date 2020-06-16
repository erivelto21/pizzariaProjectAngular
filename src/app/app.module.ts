import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InterceptorModule } from './interceptors/interceptor.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlavorService } from './services/flavor.service';
import { ProductListComponent } from './product-list/product-list.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FlavorsListsComponent } from './flavors-lists/flavors-lists.component';
import { CarouselHomePageComponent } from './carousel-home-page/carousel-home-page.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { ShoppingCartComponent } from './navbar/shopping-cart/shopping-cart.component';
import { CartService } from './services/cart.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NavPizzaTypesComponent } from './nav-pizza-types/nav-pizza-types.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth-guard.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { ItemsListComponent } from './checkout/items-list/items-list.component';
import { EditDeliveryDataComponent } from './edit-delivery-data/edit-delivery-data.component';
import { TextMaskModule } from 'angular2-text-mask';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { AddressDisplayComponent } from './payment-page/address-display/address-display.component';
import { PaymentComponent } from './payment-page/payment/payment.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderListComponent } from './order-list/order-list.component';
import { DetailsModalComponent } from './order-list/details-modal/details-modal.component';
import { EditPizzaComponent } from './edit-pizza/edit-pizza.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { SystemUserDataComponent } from './system-user-data/system-user-data.component';
import { DiscountCouponComponent } from './discount-coupon/discount-coupon.component';
import { PaymentFormComponent } from './payment-page/payment/payment-form/payment-form.component';
import { StoresListComponent } from './stores-list/stores-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SingleProductComponent,
    NavbarComponent,
    HomePageComponent,
    FlavorsListsComponent,
    CarouselHomePageComponent,
    SideNavbarComponent,
    ShoppingCartComponent,
    LoginComponent,
    NavPizzaTypesComponent,
    AlertComponent,
    UserRegisterComponent,
    CheckoutComponent,
    ItemsListComponent,
    EditDeliveryDataComponent,
    PaymentPageComponent,
    AddressDisplayComponent,
    PaymentComponent,
    FooterComponent,
    NotFoundComponent,
    OrderListComponent,
    DetailsModalComponent,
    EditPizzaComponent,
    FavoriteListComponent,
    SystemUserDataComponent,
    DiscountCouponComponent,
    PaymentFormComponent,
    StoresListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    TextMaskModule,
    InterceptorModule
  ],
  providers: [FlavorService, CartService, AlertService, UserService, AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
